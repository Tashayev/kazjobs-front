import { JobState } from "./types"

export const clearSelectedJob = (state: JobState) => {
  state.selectedJob = null
}
