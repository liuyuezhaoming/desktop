import * as React from 'react'

import { timeout } from '../../lib/promise'
import { formatRebaseValue } from '../../lib/rebase'

import { RebaseProgressSummary } from '../../models/rebase'

import { RichText } from '../lib/rich-text'

import { Dialog, DialogContent } from '../dialog'
import { Octicon, OcticonSymbol } from '../octicons'

interface IRebaseProgressDialogProps {
  /** Progress information about the current rebase */
  readonly progress: RebaseProgressSummary

  readonly emoji: Map<string, string>

  /**
   * An optional action to run when the component is mounted
   *
   * This should typically be the rebase action to perform.
   */
  readonly onDidMount?: () => Promise<void>
}

export class RebaseProgressDialog extends React.Component<
  IRebaseProgressDialogProps
> {
  private onDismissed = () => {
    // this dialog is undismissable, but I need to handle the event
  }

  /** After a delay, run the assigned action to start/continue the rebase */
  public async componentDidMount() {
    if (this.props.onDidMount) {
      await timeout(500)
      await this.props.onDidMount()
    }
  }

  public render() {
    const { count, commits, value, currentCommitSummary } = this.props.progress
    const total = commits.length
    const text = currentCommitSummary || ''

    const progressValue = formatRebaseValue(value)
    return (
      <Dialog
        dismissable={false}
        onDismissed={this.onDismissed}
        disableClickDismissalAlways={false}
        id="rebase-progress"
        title="Rebase in progress"
      >
        <DialogContent>
          <div>
            <progress value={progressValue} />

            <div className="details">
              <div className="green-circle">
                <Octicon symbol={OcticonSymbol.check} />
              </div>
              <div className="summary">
                <div className="message">
                  Commit {count} of {total}
                </div>
                <div className="detail">
                  <RichText emoji={this.props.emoji} text={text} />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}
