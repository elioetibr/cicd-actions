import { Manifest } from './manifests'

/**
 * Represents the inputs required for performing actions.
 * @interface Inputs
 */
export interface Inputs {
  version: string;
  environment: string;
  gitops_file: string;
  owner: string;
  ref: string;
  repo: string;
  token: string | undefined;
}

/**
 * Interface representing the outputs of Actions.
 * @interface Version
 */
export interface Version {
  major: string;
  minor: string;
  patch: string;
  sem_ver: string;
}

/**
 * Interface representing the outputs of Actions.
 * @interface Outputs
 */
export interface Outputs extends Manifest, Version {}
