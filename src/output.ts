// Semver allows alphanumeric and '-' in build and prerelease metadata

const joinSeparator = (primary: string) => (primary.includes('-') ? '.' : '-');

const joinVersionInfo = (primary: string, suffix: string) =>
  suffix !== '' ? `${primary}${joinSeparator(primary)}${suffix}` : primary;

export interface Descriptor {
  versionMain: () => string;
  versionSuffix: () => string;
}

export const cleanForSemver = (str: string): string =>
  str.replace(/[^a-zA-Z0-9-]+/g, '');

export const descriptorToString = ({
  versionMain,
  versionSuffix,
}: Descriptor): string => joinVersionInfo(versionMain(), versionSuffix());
