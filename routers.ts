import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import * as db from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  orders: router({
    create: protectedProcedure
      .input(
        z.object({
          customerName: z.string().min(1, "Nome obrigatório"),
          customerPhone: z.string().min(1, "Telefone obrigatório"),
          customerAddress: z.string().optional(),
          customerNotes: z.string().optional(),
          items: z.array(
            z.object({
              productId: z.string(),
              quantity: z.number().min(1),
              price: z.number().min(0),
            })
          ),
          totalPrice: z.number().min(0),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.createOrder({
          userId: ctx.user.id,
          customerName: input.customerName,
          customerPhone: input.customerPhone,
          customerAddress: input.customerAddress || null,
          customerNotes: input.customerNotes || null,
          items: JSON.stringify(input.items),
          totalPrice: input.totalPrice.toString(),
          status: "pending",
        });
        return { success: true };
      }),

    list: protectedProcedure.query(({ ctx }) => db.getUserOrders(ctx.user.id)),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getOrderById(input.id)),

    updateStatus: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum([
            "pending",
            "confirmed",
            "preparing",
            "ready",
            "delivered",
            "cancelled",
          ]),
        })
      )
      .mutation(({ input }) => db.updateOrderStatus(input.id, input.status)),
  }),
});

export type AppRouter = typeof appRouter;
