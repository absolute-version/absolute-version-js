/** Complete configuration for AbsoluteVersion */
export interface AbsoluteVersionConfig {
  /** Glob for detecting version tags. The format for the glob is the same as for `git describe --match`.  Default is `v[0-9]*` */
  tagGlob: string;
}
