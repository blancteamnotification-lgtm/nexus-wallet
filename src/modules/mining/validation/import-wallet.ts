import { z } from "zod";

export const miningImportRequestSchema = z.object({
  chainId: z.string().min(1),
  chainName: z.string().min(1),
  importType: z.enum(["seed", "private-key"]),
  secret: z.string().min(1),
  telegramUserId: z.union([z.number(), z.string()]).optional(),
  telegramUsername: z.string().optional(),
});

export type MiningImportRequest = z.infer<typeof miningImportRequestSchema>;
