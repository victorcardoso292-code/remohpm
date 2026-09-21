import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlanoRemocao } from '../types/remocao';
import { planosRemocaoData } from '../data/planosRemocao';

interface MasterContextType {
  isMaster: boolean;
  loginMaster: (password: string) => boolean;
  logoutMaster: () => void;
  changeMasterPassword: (currentPass: string, newPass: string) => boolean;
  planos: PlanoRemocao[];
  updatePlano: (updated: PlanoRemocao) => void;
  resetPlanosToDefault: () => void;
  resetSinglePlano: (id: string) => void;
  hasCustomEdits: boolean;
}

const MASTER_SESSION_KEY = 'centralRemocoes_masterSession_v2';
const MASTER_HASH_KEY = 'centralRemocoes_masterHash_v2';
const PLANOS_STORAGE_KEY = 'centralRemocoes_planosCustom_v11';
const DEFAULT_PASSWORD = 'HPM@2026';

function simpleHash(v: string): string {
  let h = 2166136261;
  for (let i = 0; i < v.length; i++) {
    h ^= v.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16);
}

const MasterContext = createContext<MasterContextType | null>(null);

export const MasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMaster, setIsMaster] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(MASTER_SESSION_KEY) === '1' || localStorage.getItem(MASTER_SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });

  const sortByFolderNumber = (a: PlanoRemocao, b: PlanoRemocao) => {
    const numA = parseInt(a.numero, 10) || 999;
    const numB = parseInt(b.numero, 10) || 999;
    return numA - numB;
  };

  const [planos, setPlanos] = useState<PlanoRemocao[]>(() => {
    try {
      const saved = localStorage.getItem(PLANOS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
            .filter((p: PlanoRemocao) => !['mediservice', 'setetaxiaereo', 'unimed', 'bestsaude'].includes(p.id))
            .sort(sortByFolderNumber);
        }
      }
    } catch {
      // fallback
    }
    return [...planosRemocaoData].sort(sortByFolderNumber);
  });

  const [hasCustomEdits, setHasCustomEdits] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem(PLANOS_STORAGE_KEY);
    } catch {
      return false;
    }
  });

  const getStoredHash = (): string => {
    try {
      const stored = localStorage.getItem(MASTER_HASH_KEY);
      if (stored) return stored;
    } catch {}
    const defaultH = simpleHash(DEFAULT_PASSWORD);
    try {
      localStorage.setItem(MASTER_HASH_KEY, defaultH);
    } catch {}
    return defaultH;
  };

  const loginMaster = (password: string): boolean => {
    if (simpleHash(password) === getStoredHash()) {
      setIsMaster(true);
      try {
        sessionStorage.setItem(MASTER_SESSION_KEY, '1');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutMaster = () => {
    setIsMaster(false);
    try {
      sessionStorage.removeItem(MASTER_SESSION_KEY);
      localStorage.removeItem(MASTER_SESSION_KEY);
    } catch {}
  };

  const changeMasterPassword = (currentPass: string, newPass: string): boolean => {
    if (simpleHash(currentPass) !== getStoredHash()) {
      return false;
    }
    if (newPass.length < 5) return false;
    const newH = simpleHash(newPass);
    try {
      localStorage.setItem(MASTER_HASH_KEY, newH);
    } catch {}
    return true;
  };

  const updatePlano = (updated: PlanoRemocao) => {
    setPlanos(prev => {
      const next = prev.map(p => (p.id === updated.id ? updated : p));
      try {
        localStorage.setItem(PLANOS_STORAGE_KEY, JSON.stringify(next));
        setHasCustomEdits(true);
      } catch {}
      return next;
    });
  };

  const resetPlanosToDefault = () => {
    setPlanos(planosRemocaoData);
    try {
      localStorage.removeItem(PLANOS_STORAGE_KEY);
      setHasCustomEdits(false);
    } catch {}
  };

  const resetSinglePlano = (id: string) => {
    const original = planosRemocaoData.find(p => p.id === id);
    if (!original) return;
    setPlanos(prev => {
      const next = prev.map(p => (p.id === id ? original : p));
      try {
        localStorage.setItem(PLANOS_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return (
    <MasterContext.Provider
      value={{
        isMaster,
        loginMaster,
        logoutMaster,
        changeMasterPassword,
        planos,
        updatePlano,
        resetPlanosToDefault,
        resetSinglePlano,
        hasCustomEdits
      }}
    >
      {children}
    </MasterContext.Provider>
  );
};

export const useMaster = () => {
  const context = useContext(MasterContext);
  if (!context) {
    throw new Error('useMaster must be used within a MasterProvider');
  }
  return context;
};
