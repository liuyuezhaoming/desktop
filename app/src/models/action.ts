/**
 * States representing an action being computed in the background on behalf of
 * the user in the app to indicate whether additional work by the user to
 * complete is needed.
 */
export enum ComputedActionKind {
  /** The action is being computed in the background */
  Loading = 'loading',
  /** The action cannot be completed, for reasons the app should explain */
  Invalid = 'invalid',
  /** The action should complete without any additional work required by the user */
  Clean = 'clean',
  /** The action requires additional work by the user to complete successfully */
  Conflicts = 'conflicts',
}
