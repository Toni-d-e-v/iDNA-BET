import { call } from 'redux-saga/effects';
import {
  CallContractAttachment,
  ContractArgumentFormat,
  DeployContractAttachment,
  EmbeddedContractType,
  calculateGasCost,
  IdenaProvider,
  TerminateContractAttachment,
  TransactionType
} from 'idena-sdk-js';
import { appConfigurations } from './constants';

// use sdk?