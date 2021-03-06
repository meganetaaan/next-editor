import { Intent } from "@blueprintjs/core"
import fs from "fs"
import * as git from "isomorphic-git"
import React from "react"
import { toast } from "../../utils/toast"

type Props = { projectRoot: string; remotes: string[] }

export class FetchManager extends React.Component<
  Props,
  { selectedRemote: string }
> {
  constructor(props: Props) {
    super(props)
    this.state = {
      selectedRemote: props.remotes[0]
    }
  }
  render() {
    const { projectRoot, remotes } = this.props
    const { selectedRemote } = this.state

    return (
      <div>
        {remotes.length > 0 && (
          <>
            Fetch from&nbsp;
            <select
              value={selectedRemote}
              onChange={ev =>
                this.setState({ selectedRemote: ev.target.value })
              }
            >
              {remotes.map(remote => (
                <option key={remote} value={remote}>
                  {remote}
                </option>
              ))}
            </select>
            <button
              onClick={async () => {
                try {
                  ;(git.fetch as any)({
                    fs,
                    dir: projectRoot,
                    remote: this.state.selectedRemote
                  })
                  // TODO: show updated branch
                  toast({
                    message: `Fetch done: ${this.state.selectedRemote}`
                  })
                } catch (e) {
                  toast({
                    intent: Intent.DANGER,
                    message: `Fetch failed: ${this.state.selectedRemote}`
                  })
                }
              }}
            >
              exec
            </button>
          </>
        )}
      </div>
    )
  }
}
