import type { ProjectErrorCodes } from "../types/project";

export class ProjectError extends Error {
  constructor(public code: ProjectErrorCodes) {
    super(code);
  }
}