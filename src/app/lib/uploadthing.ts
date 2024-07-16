import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "../app/api/(external)/uploadthing/core";

export const { uploadFiles } = generateReactHelpers<OurFileRouter>();
