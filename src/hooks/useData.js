import React from 'react';
import { useContext } from 'react';
import { CentralBase } from '../contexts/DataProvider';

function useData() {
  return useContext(CentralBase );
}

export default useData