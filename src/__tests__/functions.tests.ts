import { validateSemanticVersion, splitSemanticVersion, ensureSemanticVersionPrefix } from '../functions'

jest.mock('@actions/core');
jest.mock('@octokit/rest');
jest.mock('@octokit/auth-app');
jest.mock('@actions/github');

/**
 * Test file for getSemanticVersion() function from index.ts
 * Test case: Function should add "v" prefix to version if not already present
 */
describe('ensureSemanticVersionPrefix function', () => {
  /**
   * Add v to app_version
   */
  it('Given a Version Should return just a Semantic Version', () => {
    const input_version = '1.2.3-continuous-delivery.ci';
    const expected = 'v1.2.3-continuous-delivery.ci';
    const result = ensureSemanticVersionPrefix(input_version);
    expect(result).toBe(expected);
  });
});

/**
 * Test file for getSemanticVersion() function from index.ts
 * Test case: Function should add "v" prefix to version if not already present
 */
describe('getSemanticVersion function', () => {
  /**
   * Add v to app_version
   */
  it('Given a Version Should return just a Semantic Version', () => {
    const input_version = 'v1.2.3-continuous-delivery.ci';
    const expected: boolean = true;
    const result: boolean = validateSemanticVersion(input_version);
    expect(result).toBe(expected);
  });
});

/**
 * Test file for getSemanticVersion() function from index.ts
 * Test case: Function should add "v" prefix to version if not already present
 */
describe('splitSemanticVersion function', () => {
  /**
   * Add v to app_version
   */
  it('Given a Version v1.2.3-continuous-delivery.ci Should return string[] from Semantic Version', () => {
    const input_version = 'v1.2.3-continuous-delivery.ci';
    const expected: string[] = ['1', '2', '3'];
    const result: string[] = splitSemanticVersion(input_version);
    expect(result).toEqual(expected);
  });

  /**
   * Add v to app_version
   */
  it('Given a Version 1.2.3-continuous-delivery.ci Should return string[] from Semantic Version', () => {
    const input_version = '1.2.3-continuous-delivery.ci';
    const expected: string[] = ['1', '2', '3'];
    const result: string[] = splitSemanticVersion(input_version);
    expect(result).toEqual(expected);
  });

  /**
   * Add v to app_version
   */
  it('Given a Version 0.1.391 Should return string[] from Semantic Version', () => {
    const input_version = '0.1.391';
    const expected: string[] = ['0', '1', '391'];
    const result: string[] = splitSemanticVersion(input_version);
    expect(result).toEqual(expected);
  });
});
