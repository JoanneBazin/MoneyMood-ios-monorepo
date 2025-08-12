
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model FixedIncome
 * 
 */
export type FixedIncome = $Result.DefaultSelection<Prisma.$FixedIncomePayload>
/**
 * Model FixedCharge
 * 
 */
export type FixedCharge = $Result.DefaultSelection<Prisma.$FixedChargePayload>
/**
 * Model MonthlyBudget
 * 
 */
export type MonthlyBudget = $Result.DefaultSelection<Prisma.$MonthlyBudgetPayload>
/**
 * Model MonthlyIncome
 * 
 */
export type MonthlyIncome = $Result.DefaultSelection<Prisma.$MonthlyIncomePayload>
/**
 * Model MonthlyCharge
 * 
 */
export type MonthlyCharge = $Result.DefaultSelection<Prisma.$MonthlyChargePayload>
/**
 * Model WeeklyExpense
 * 
 */
export type WeeklyExpense = $Result.DefaultSelection<Prisma.$WeeklyExpensePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.fixedIncome`: Exposes CRUD operations for the **FixedIncome** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FixedIncomes
    * const fixedIncomes = await prisma.fixedIncome.findMany()
    * ```
    */
  get fixedIncome(): Prisma.FixedIncomeDelegate<ExtArgs>;

  /**
   * `prisma.fixedCharge`: Exposes CRUD operations for the **FixedCharge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FixedCharges
    * const fixedCharges = await prisma.fixedCharge.findMany()
    * ```
    */
  get fixedCharge(): Prisma.FixedChargeDelegate<ExtArgs>;

  /**
   * `prisma.monthlyBudget`: Exposes CRUD operations for the **MonthlyBudget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MonthlyBudgets
    * const monthlyBudgets = await prisma.monthlyBudget.findMany()
    * ```
    */
  get monthlyBudget(): Prisma.MonthlyBudgetDelegate<ExtArgs>;

  /**
   * `prisma.monthlyIncome`: Exposes CRUD operations for the **MonthlyIncome** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MonthlyIncomes
    * const monthlyIncomes = await prisma.monthlyIncome.findMany()
    * ```
    */
  get monthlyIncome(): Prisma.MonthlyIncomeDelegate<ExtArgs>;

  /**
   * `prisma.monthlyCharge`: Exposes CRUD operations for the **MonthlyCharge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MonthlyCharges
    * const monthlyCharges = await prisma.monthlyCharge.findMany()
    * ```
    */
  get monthlyCharge(): Prisma.MonthlyChargeDelegate<ExtArgs>;

  /**
   * `prisma.weeklyExpense`: Exposes CRUD operations for the **WeeklyExpense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeeklyExpenses
    * const weeklyExpenses = await prisma.weeklyExpense.findMany()
    * ```
    */
  get weeklyExpense(): Prisma.WeeklyExpenseDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.14.0
   * Query Engine version: e9771e62de70f79a5e1c604a2d7c8e2a0a874b48
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Session: 'Session',
    FixedIncome: 'FixedIncome',
    FixedCharge: 'FixedCharge',
    MonthlyBudget: 'MonthlyBudget',
    MonthlyIncome: 'MonthlyIncome',
    MonthlyCharge: 'MonthlyCharge',
    WeeklyExpense: 'WeeklyExpense'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'user' | 'session' | 'fixedIncome' | 'fixedCharge' | 'monthlyBudget' | 'monthlyIncome' | 'monthlyCharge' | 'weeklyExpense'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>,
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      FixedIncome: {
        payload: Prisma.$FixedIncomePayload<ExtArgs>
        fields: Prisma.FixedIncomeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FixedIncomeFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedIncomePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FixedIncomeFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedIncomePayload>
          }
          findFirst: {
            args: Prisma.FixedIncomeFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedIncomePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FixedIncomeFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedIncomePayload>
          }
          findMany: {
            args: Prisma.FixedIncomeFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedIncomePayload>[]
          }
          create: {
            args: Prisma.FixedIncomeCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedIncomePayload>
          }
          createMany: {
            args: Prisma.FixedIncomeCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FixedIncomeCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedIncomePayload>[]
          }
          delete: {
            args: Prisma.FixedIncomeDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedIncomePayload>
          }
          update: {
            args: Prisma.FixedIncomeUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedIncomePayload>
          }
          deleteMany: {
            args: Prisma.FixedIncomeDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.FixedIncomeUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.FixedIncomeUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedIncomePayload>
          }
          aggregate: {
            args: Prisma.FixedIncomeAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateFixedIncome>
          }
          groupBy: {
            args: Prisma.FixedIncomeGroupByArgs<ExtArgs>,
            result: $Utils.Optional<FixedIncomeGroupByOutputType>[]
          }
          count: {
            args: Prisma.FixedIncomeCountArgs<ExtArgs>,
            result: $Utils.Optional<FixedIncomeCountAggregateOutputType> | number
          }
        }
      }
      FixedCharge: {
        payload: Prisma.$FixedChargePayload<ExtArgs>
        fields: Prisma.FixedChargeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FixedChargeFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedChargePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FixedChargeFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedChargePayload>
          }
          findFirst: {
            args: Prisma.FixedChargeFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedChargePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FixedChargeFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedChargePayload>
          }
          findMany: {
            args: Prisma.FixedChargeFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedChargePayload>[]
          }
          create: {
            args: Prisma.FixedChargeCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedChargePayload>
          }
          createMany: {
            args: Prisma.FixedChargeCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FixedChargeCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedChargePayload>[]
          }
          delete: {
            args: Prisma.FixedChargeDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedChargePayload>
          }
          update: {
            args: Prisma.FixedChargeUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedChargePayload>
          }
          deleteMany: {
            args: Prisma.FixedChargeDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.FixedChargeUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.FixedChargeUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FixedChargePayload>
          }
          aggregate: {
            args: Prisma.FixedChargeAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateFixedCharge>
          }
          groupBy: {
            args: Prisma.FixedChargeGroupByArgs<ExtArgs>,
            result: $Utils.Optional<FixedChargeGroupByOutputType>[]
          }
          count: {
            args: Prisma.FixedChargeCountArgs<ExtArgs>,
            result: $Utils.Optional<FixedChargeCountAggregateOutputType> | number
          }
        }
      }
      MonthlyBudget: {
        payload: Prisma.$MonthlyBudgetPayload<ExtArgs>
        fields: Prisma.MonthlyBudgetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MonthlyBudgetFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyBudgetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MonthlyBudgetFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyBudgetPayload>
          }
          findFirst: {
            args: Prisma.MonthlyBudgetFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyBudgetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MonthlyBudgetFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyBudgetPayload>
          }
          findMany: {
            args: Prisma.MonthlyBudgetFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyBudgetPayload>[]
          }
          create: {
            args: Prisma.MonthlyBudgetCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyBudgetPayload>
          }
          createMany: {
            args: Prisma.MonthlyBudgetCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MonthlyBudgetCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyBudgetPayload>[]
          }
          delete: {
            args: Prisma.MonthlyBudgetDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyBudgetPayload>
          }
          update: {
            args: Prisma.MonthlyBudgetUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyBudgetPayload>
          }
          deleteMany: {
            args: Prisma.MonthlyBudgetDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.MonthlyBudgetUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.MonthlyBudgetUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyBudgetPayload>
          }
          aggregate: {
            args: Prisma.MonthlyBudgetAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateMonthlyBudget>
          }
          groupBy: {
            args: Prisma.MonthlyBudgetGroupByArgs<ExtArgs>,
            result: $Utils.Optional<MonthlyBudgetGroupByOutputType>[]
          }
          count: {
            args: Prisma.MonthlyBudgetCountArgs<ExtArgs>,
            result: $Utils.Optional<MonthlyBudgetCountAggregateOutputType> | number
          }
        }
      }
      MonthlyIncome: {
        payload: Prisma.$MonthlyIncomePayload<ExtArgs>
        fields: Prisma.MonthlyIncomeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MonthlyIncomeFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyIncomePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MonthlyIncomeFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyIncomePayload>
          }
          findFirst: {
            args: Prisma.MonthlyIncomeFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyIncomePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MonthlyIncomeFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyIncomePayload>
          }
          findMany: {
            args: Prisma.MonthlyIncomeFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyIncomePayload>[]
          }
          create: {
            args: Prisma.MonthlyIncomeCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyIncomePayload>
          }
          createMany: {
            args: Prisma.MonthlyIncomeCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MonthlyIncomeCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyIncomePayload>[]
          }
          delete: {
            args: Prisma.MonthlyIncomeDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyIncomePayload>
          }
          update: {
            args: Prisma.MonthlyIncomeUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyIncomePayload>
          }
          deleteMany: {
            args: Prisma.MonthlyIncomeDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.MonthlyIncomeUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.MonthlyIncomeUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyIncomePayload>
          }
          aggregate: {
            args: Prisma.MonthlyIncomeAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateMonthlyIncome>
          }
          groupBy: {
            args: Prisma.MonthlyIncomeGroupByArgs<ExtArgs>,
            result: $Utils.Optional<MonthlyIncomeGroupByOutputType>[]
          }
          count: {
            args: Prisma.MonthlyIncomeCountArgs<ExtArgs>,
            result: $Utils.Optional<MonthlyIncomeCountAggregateOutputType> | number
          }
        }
      }
      MonthlyCharge: {
        payload: Prisma.$MonthlyChargePayload<ExtArgs>
        fields: Prisma.MonthlyChargeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MonthlyChargeFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyChargePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MonthlyChargeFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyChargePayload>
          }
          findFirst: {
            args: Prisma.MonthlyChargeFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyChargePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MonthlyChargeFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyChargePayload>
          }
          findMany: {
            args: Prisma.MonthlyChargeFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyChargePayload>[]
          }
          create: {
            args: Prisma.MonthlyChargeCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyChargePayload>
          }
          createMany: {
            args: Prisma.MonthlyChargeCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MonthlyChargeCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyChargePayload>[]
          }
          delete: {
            args: Prisma.MonthlyChargeDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyChargePayload>
          }
          update: {
            args: Prisma.MonthlyChargeUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyChargePayload>
          }
          deleteMany: {
            args: Prisma.MonthlyChargeDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.MonthlyChargeUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.MonthlyChargeUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MonthlyChargePayload>
          }
          aggregate: {
            args: Prisma.MonthlyChargeAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateMonthlyCharge>
          }
          groupBy: {
            args: Prisma.MonthlyChargeGroupByArgs<ExtArgs>,
            result: $Utils.Optional<MonthlyChargeGroupByOutputType>[]
          }
          count: {
            args: Prisma.MonthlyChargeCountArgs<ExtArgs>,
            result: $Utils.Optional<MonthlyChargeCountAggregateOutputType> | number
          }
        }
      }
      WeeklyExpense: {
        payload: Prisma.$WeeklyExpensePayload<ExtArgs>
        fields: Prisma.WeeklyExpenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeeklyExpenseFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WeeklyExpensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeeklyExpenseFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WeeklyExpensePayload>
          }
          findFirst: {
            args: Prisma.WeeklyExpenseFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WeeklyExpensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeeklyExpenseFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WeeklyExpensePayload>
          }
          findMany: {
            args: Prisma.WeeklyExpenseFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WeeklyExpensePayload>[]
          }
          create: {
            args: Prisma.WeeklyExpenseCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WeeklyExpensePayload>
          }
          createMany: {
            args: Prisma.WeeklyExpenseCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeeklyExpenseCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WeeklyExpensePayload>[]
          }
          delete: {
            args: Prisma.WeeklyExpenseDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WeeklyExpensePayload>
          }
          update: {
            args: Prisma.WeeklyExpenseUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WeeklyExpensePayload>
          }
          deleteMany: {
            args: Prisma.WeeklyExpenseDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.WeeklyExpenseUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.WeeklyExpenseUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WeeklyExpensePayload>
          }
          aggregate: {
            args: Prisma.WeeklyExpenseAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateWeeklyExpense>
          }
          groupBy: {
            args: Prisma.WeeklyExpenseGroupByArgs<ExtArgs>,
            result: $Utils.Optional<WeeklyExpenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeeklyExpenseCountArgs<ExtArgs>,
            result: $Utils.Optional<WeeklyExpenseCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    fixedIncomes: number
    fixedCharges: number
    monthlyBudgets: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    fixedIncomes?: boolean | UserCountOutputTypeCountFixedIncomesArgs
    fixedCharges?: boolean | UserCountOutputTypeCountFixedChargesArgs
    monthlyBudgets?: boolean | UserCountOutputTypeCountMonthlyBudgetsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFixedIncomesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FixedIncomeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFixedChargesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FixedChargeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMonthlyBudgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyBudgetWhereInput
  }


  /**
   * Count Type MonthlyBudgetCountOutputType
   */

  export type MonthlyBudgetCountOutputType = {
    incomes: number
    charges: number
    expenses: number
  }

  export type MonthlyBudgetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    incomes?: boolean | MonthlyBudgetCountOutputTypeCountIncomesArgs
    charges?: boolean | MonthlyBudgetCountOutputTypeCountChargesArgs
    expenses?: boolean | MonthlyBudgetCountOutputTypeCountExpensesArgs
  }

  // Custom InputTypes
  /**
   * MonthlyBudgetCountOutputType without action
   */
  export type MonthlyBudgetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyBudgetCountOutputType
     */
    select?: MonthlyBudgetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MonthlyBudgetCountOutputType without action
   */
  export type MonthlyBudgetCountOutputTypeCountIncomesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyIncomeWhereInput
  }

  /**
   * MonthlyBudgetCountOutputType without action
   */
  export type MonthlyBudgetCountOutputTypeCountChargesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyChargeWhereInput
  }

  /**
   * MonthlyBudgetCountOutputType without action
   */
  export type MonthlyBudgetCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeeklyExpenseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    fixedIncomes?: boolean | User$fixedIncomesArgs<ExtArgs>
    fixedCharges?: boolean | User$fixedChargesArgs<ExtArgs>
    monthlyBudgets?: boolean | User$monthlyBudgetsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
  }


  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    fixedIncomes?: boolean | User$fixedIncomesArgs<ExtArgs>
    fixedCharges?: boolean | User$fixedChargesArgs<ExtArgs>
    monthlyBudgets?: boolean | User$monthlyBudgetsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      fixedIncomes: Prisma.$FixedIncomePayload<ExtArgs>[]
      fixedCharges: Prisma.$FixedChargePayload<ExtArgs>[]
      monthlyBudgets: Prisma.$MonthlyBudgetPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }


  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends UserCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findMany'> | Null>;

    fixedIncomes<T extends User$fixedIncomesArgs<ExtArgs> = {}>(args?: Subset<T, User$fixedIncomesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FixedIncomePayload<ExtArgs>, T, 'findMany'> | Null>;

    fixedCharges<T extends User$fixedChargesArgs<ExtArgs> = {}>(args?: Subset<T, User$fixedChargesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FixedChargePayload<ExtArgs>, T, 'findMany'> | Null>;

    monthlyBudgets<T extends User$monthlyBudgetsArgs<ExtArgs> = {}>(args?: Subset<T, User$monthlyBudgetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyBudgetPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.fixedIncomes
   */
  export type User$fixedIncomesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedIncome
     */
    select?: FixedIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedIncomeInclude<ExtArgs> | null
    where?: FixedIncomeWhereInput
    orderBy?: FixedIncomeOrderByWithRelationInput | FixedIncomeOrderByWithRelationInput[]
    cursor?: FixedIncomeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FixedIncomeScalarFieldEnum | FixedIncomeScalarFieldEnum[]
  }

  /**
   * User.fixedCharges
   */
  export type User$fixedChargesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedCharge
     */
    select?: FixedChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedChargeInclude<ExtArgs> | null
    where?: FixedChargeWhereInput
    orderBy?: FixedChargeOrderByWithRelationInput | FixedChargeOrderByWithRelationInput[]
    cursor?: FixedChargeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FixedChargeScalarFieldEnum | FixedChargeScalarFieldEnum[]
  }

  /**
   * User.monthlyBudgets
   */
  export type User$monthlyBudgetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyBudget
     */
    select?: MonthlyBudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyBudgetInclude<ExtArgs> | null
    where?: MonthlyBudgetWhereInput
    orderBy?: MonthlyBudgetOrderByWithRelationInput | MonthlyBudgetOrderByWithRelationInput[]
    cursor?: MonthlyBudgetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MonthlyBudgetScalarFieldEnum | MonthlyBudgetScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    expiresAt: Date
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }


  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }


  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SessionFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>
    ): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SessionFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>
    ): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SessionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
    **/
    create<T extends SessionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SessionCreateArgs<ExtArgs>>
    ): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends SessionCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
    **/
    delete<T extends SessionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>
    ): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SessionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>
    ): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SessionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SessionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
    **/
    upsert<T extends SessionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>
    ): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model FixedIncome
   */

  export type AggregateFixedIncome = {
    _count: FixedIncomeCountAggregateOutputType | null
    _avg: FixedIncomeAvgAggregateOutputType | null
    _sum: FixedIncomeSumAggregateOutputType | null
    _min: FixedIncomeMinAggregateOutputType | null
    _max: FixedIncomeMaxAggregateOutputType | null
  }

  export type FixedIncomeAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type FixedIncomeSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type FixedIncomeMinAggregateOutputType = {
    id: string | null
    name: string | null
    amount: Decimal | null
    userId: string | null
    createdAt: Date | null
  }

  export type FixedIncomeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    amount: Decimal | null
    userId: string | null
    createdAt: Date | null
  }

  export type FixedIncomeCountAggregateOutputType = {
    id: number
    name: number
    amount: number
    userId: number
    createdAt: number
    _all: number
  }


  export type FixedIncomeAvgAggregateInputType = {
    amount?: true
  }

  export type FixedIncomeSumAggregateInputType = {
    amount?: true
  }

  export type FixedIncomeMinAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    userId?: true
    createdAt?: true
  }

  export type FixedIncomeMaxAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    userId?: true
    createdAt?: true
  }

  export type FixedIncomeCountAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type FixedIncomeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FixedIncome to aggregate.
     */
    where?: FixedIncomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FixedIncomes to fetch.
     */
    orderBy?: FixedIncomeOrderByWithRelationInput | FixedIncomeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FixedIncomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FixedIncomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FixedIncomes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FixedIncomes
    **/
    _count?: true | FixedIncomeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FixedIncomeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FixedIncomeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FixedIncomeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FixedIncomeMaxAggregateInputType
  }

  export type GetFixedIncomeAggregateType<T extends FixedIncomeAggregateArgs> = {
        [P in keyof T & keyof AggregateFixedIncome]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFixedIncome[P]>
      : GetScalarType<T[P], AggregateFixedIncome[P]>
  }




  export type FixedIncomeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FixedIncomeWhereInput
    orderBy?: FixedIncomeOrderByWithAggregationInput | FixedIncomeOrderByWithAggregationInput[]
    by: FixedIncomeScalarFieldEnum[] | FixedIncomeScalarFieldEnum
    having?: FixedIncomeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FixedIncomeCountAggregateInputType | true
    _avg?: FixedIncomeAvgAggregateInputType
    _sum?: FixedIncomeSumAggregateInputType
    _min?: FixedIncomeMinAggregateInputType
    _max?: FixedIncomeMaxAggregateInputType
  }

  export type FixedIncomeGroupByOutputType = {
    id: string
    name: string
    amount: Decimal
    userId: string
    createdAt: Date
    _count: FixedIncomeCountAggregateOutputType | null
    _avg: FixedIncomeAvgAggregateOutputType | null
    _sum: FixedIncomeSumAggregateOutputType | null
    _min: FixedIncomeMinAggregateOutputType | null
    _max: FixedIncomeMaxAggregateOutputType | null
  }

  type GetFixedIncomeGroupByPayload<T extends FixedIncomeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FixedIncomeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FixedIncomeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FixedIncomeGroupByOutputType[P]>
            : GetScalarType<T[P], FixedIncomeGroupByOutputType[P]>
        }
      >
    >


  export type FixedIncomeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    amount?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fixedIncome"]>

  export type FixedIncomeSelectScalar = {
    id?: boolean
    name?: boolean
    amount?: boolean
    userId?: boolean
    createdAt?: boolean
  }


  export type FixedIncomeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $FixedIncomePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FixedIncome"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      amount: Prisma.Decimal
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["fixedIncome"]>
    composites: {}
  }


  type FixedIncomeGetPayload<S extends boolean | null | undefined | FixedIncomeDefaultArgs> = $Result.GetResult<Prisma.$FixedIncomePayload, S>

  type FixedIncomeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FixedIncomeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FixedIncomeCountAggregateInputType | true
    }

  export interface FixedIncomeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FixedIncome'], meta: { name: 'FixedIncome' } }
    /**
     * Find zero or one FixedIncome that matches the filter.
     * @param {FixedIncomeFindUniqueArgs} args - Arguments to find a FixedIncome
     * @example
     * // Get one FixedIncome
     * const fixedIncome = await prisma.fixedIncome.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FixedIncomeFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, FixedIncomeFindUniqueArgs<ExtArgs>>
    ): Prisma__FixedIncomeClient<$Result.GetResult<Prisma.$FixedIncomePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one FixedIncome that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FixedIncomeFindUniqueOrThrowArgs} args - Arguments to find a FixedIncome
     * @example
     * // Get one FixedIncome
     * const fixedIncome = await prisma.fixedIncome.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends FixedIncomeFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, FixedIncomeFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__FixedIncomeClient<$Result.GetResult<Prisma.$FixedIncomePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first FixedIncome that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedIncomeFindFirstArgs} args - Arguments to find a FixedIncome
     * @example
     * // Get one FixedIncome
     * const fixedIncome = await prisma.fixedIncome.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FixedIncomeFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, FixedIncomeFindFirstArgs<ExtArgs>>
    ): Prisma__FixedIncomeClient<$Result.GetResult<Prisma.$FixedIncomePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first FixedIncome that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedIncomeFindFirstOrThrowArgs} args - Arguments to find a FixedIncome
     * @example
     * // Get one FixedIncome
     * const fixedIncome = await prisma.fixedIncome.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends FixedIncomeFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, FixedIncomeFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__FixedIncomeClient<$Result.GetResult<Prisma.$FixedIncomePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more FixedIncomes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedIncomeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FixedIncomes
     * const fixedIncomes = await prisma.fixedIncome.findMany()
     * 
     * // Get first 10 FixedIncomes
     * const fixedIncomes = await prisma.fixedIncome.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fixedIncomeWithIdOnly = await prisma.fixedIncome.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FixedIncomeFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FixedIncomeFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FixedIncomePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a FixedIncome.
     * @param {FixedIncomeCreateArgs} args - Arguments to create a FixedIncome.
     * @example
     * // Create one FixedIncome
     * const FixedIncome = await prisma.fixedIncome.create({
     *   data: {
     *     // ... data to create a FixedIncome
     *   }
     * })
     * 
    **/
    create<T extends FixedIncomeCreateArgs<ExtArgs>>(
      args: SelectSubset<T, FixedIncomeCreateArgs<ExtArgs>>
    ): Prisma__FixedIncomeClient<$Result.GetResult<Prisma.$FixedIncomePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many FixedIncomes.
     * @param {FixedIncomeCreateManyArgs} args - Arguments to create many FixedIncomes.
     * @example
     * // Create many FixedIncomes
     * const fixedIncome = await prisma.fixedIncome.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends FixedIncomeCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FixedIncomeCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FixedIncomes and returns the data saved in the database.
     * @param {FixedIncomeCreateManyAndReturnArgs} args - Arguments to create many FixedIncomes.
     * @example
     * // Create many FixedIncomes
     * const fixedIncome = await prisma.fixedIncome.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FixedIncomes and only return the `id`
     * const fixedIncomeWithIdOnly = await prisma.fixedIncome.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends FixedIncomeCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, FixedIncomeCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FixedIncomePayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a FixedIncome.
     * @param {FixedIncomeDeleteArgs} args - Arguments to delete one FixedIncome.
     * @example
     * // Delete one FixedIncome
     * const FixedIncome = await prisma.fixedIncome.delete({
     *   where: {
     *     // ... filter to delete one FixedIncome
     *   }
     * })
     * 
    **/
    delete<T extends FixedIncomeDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, FixedIncomeDeleteArgs<ExtArgs>>
    ): Prisma__FixedIncomeClient<$Result.GetResult<Prisma.$FixedIncomePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one FixedIncome.
     * @param {FixedIncomeUpdateArgs} args - Arguments to update one FixedIncome.
     * @example
     * // Update one FixedIncome
     * const fixedIncome = await prisma.fixedIncome.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FixedIncomeUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, FixedIncomeUpdateArgs<ExtArgs>>
    ): Prisma__FixedIncomeClient<$Result.GetResult<Prisma.$FixedIncomePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more FixedIncomes.
     * @param {FixedIncomeDeleteManyArgs} args - Arguments to filter FixedIncomes to delete.
     * @example
     * // Delete a few FixedIncomes
     * const { count } = await prisma.fixedIncome.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FixedIncomeDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FixedIncomeDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FixedIncomes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedIncomeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FixedIncomes
     * const fixedIncome = await prisma.fixedIncome.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FixedIncomeUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, FixedIncomeUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FixedIncome.
     * @param {FixedIncomeUpsertArgs} args - Arguments to update or create a FixedIncome.
     * @example
     * // Update or create a FixedIncome
     * const fixedIncome = await prisma.fixedIncome.upsert({
     *   create: {
     *     // ... data to create a FixedIncome
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FixedIncome we want to update
     *   }
     * })
    **/
    upsert<T extends FixedIncomeUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, FixedIncomeUpsertArgs<ExtArgs>>
    ): Prisma__FixedIncomeClient<$Result.GetResult<Prisma.$FixedIncomePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of FixedIncomes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedIncomeCountArgs} args - Arguments to filter FixedIncomes to count.
     * @example
     * // Count the number of FixedIncomes
     * const count = await prisma.fixedIncome.count({
     *   where: {
     *     // ... the filter for the FixedIncomes we want to count
     *   }
     * })
    **/
    count<T extends FixedIncomeCountArgs>(
      args?: Subset<T, FixedIncomeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FixedIncomeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FixedIncome.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedIncomeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FixedIncomeAggregateArgs>(args: Subset<T, FixedIncomeAggregateArgs>): Prisma.PrismaPromise<GetFixedIncomeAggregateType<T>>

    /**
     * Group by FixedIncome.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedIncomeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FixedIncomeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FixedIncomeGroupByArgs['orderBy'] }
        : { orderBy?: FixedIncomeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FixedIncomeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFixedIncomeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FixedIncome model
   */
  readonly fields: FixedIncomeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FixedIncome.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FixedIncomeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the FixedIncome model
   */ 
  interface FixedIncomeFieldRefs {
    readonly id: FieldRef<"FixedIncome", 'String'>
    readonly name: FieldRef<"FixedIncome", 'String'>
    readonly amount: FieldRef<"FixedIncome", 'Decimal'>
    readonly userId: FieldRef<"FixedIncome", 'String'>
    readonly createdAt: FieldRef<"FixedIncome", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FixedIncome findUnique
   */
  export type FixedIncomeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedIncome
     */
    select?: FixedIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedIncomeInclude<ExtArgs> | null
    /**
     * Filter, which FixedIncome to fetch.
     */
    where: FixedIncomeWhereUniqueInput
  }

  /**
   * FixedIncome findUniqueOrThrow
   */
  export type FixedIncomeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedIncome
     */
    select?: FixedIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedIncomeInclude<ExtArgs> | null
    /**
     * Filter, which FixedIncome to fetch.
     */
    where: FixedIncomeWhereUniqueInput
  }

  /**
   * FixedIncome findFirst
   */
  export type FixedIncomeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedIncome
     */
    select?: FixedIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedIncomeInclude<ExtArgs> | null
    /**
     * Filter, which FixedIncome to fetch.
     */
    where?: FixedIncomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FixedIncomes to fetch.
     */
    orderBy?: FixedIncomeOrderByWithRelationInput | FixedIncomeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FixedIncomes.
     */
    cursor?: FixedIncomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FixedIncomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FixedIncomes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FixedIncomes.
     */
    distinct?: FixedIncomeScalarFieldEnum | FixedIncomeScalarFieldEnum[]
  }

  /**
   * FixedIncome findFirstOrThrow
   */
  export type FixedIncomeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedIncome
     */
    select?: FixedIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedIncomeInclude<ExtArgs> | null
    /**
     * Filter, which FixedIncome to fetch.
     */
    where?: FixedIncomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FixedIncomes to fetch.
     */
    orderBy?: FixedIncomeOrderByWithRelationInput | FixedIncomeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FixedIncomes.
     */
    cursor?: FixedIncomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FixedIncomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FixedIncomes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FixedIncomes.
     */
    distinct?: FixedIncomeScalarFieldEnum | FixedIncomeScalarFieldEnum[]
  }

  /**
   * FixedIncome findMany
   */
  export type FixedIncomeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedIncome
     */
    select?: FixedIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedIncomeInclude<ExtArgs> | null
    /**
     * Filter, which FixedIncomes to fetch.
     */
    where?: FixedIncomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FixedIncomes to fetch.
     */
    orderBy?: FixedIncomeOrderByWithRelationInput | FixedIncomeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FixedIncomes.
     */
    cursor?: FixedIncomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FixedIncomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FixedIncomes.
     */
    skip?: number
    distinct?: FixedIncomeScalarFieldEnum | FixedIncomeScalarFieldEnum[]
  }

  /**
   * FixedIncome create
   */
  export type FixedIncomeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedIncome
     */
    select?: FixedIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedIncomeInclude<ExtArgs> | null
    /**
     * The data needed to create a FixedIncome.
     */
    data: XOR<FixedIncomeCreateInput, FixedIncomeUncheckedCreateInput>
  }

  /**
   * FixedIncome createMany
   */
  export type FixedIncomeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FixedIncomes.
     */
    data: FixedIncomeCreateManyInput | FixedIncomeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FixedIncome createManyAndReturn
   */
  export type FixedIncomeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedIncome
     */
    select?: FixedIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedIncomeInclude<ExtArgs> | null
    /**
     * The data used to create many FixedIncomes.
     */
    data: FixedIncomeCreateManyInput | FixedIncomeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FixedIncome update
   */
  export type FixedIncomeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedIncome
     */
    select?: FixedIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedIncomeInclude<ExtArgs> | null
    /**
     * The data needed to update a FixedIncome.
     */
    data: XOR<FixedIncomeUpdateInput, FixedIncomeUncheckedUpdateInput>
    /**
     * Choose, which FixedIncome to update.
     */
    where: FixedIncomeWhereUniqueInput
  }

  /**
   * FixedIncome updateMany
   */
  export type FixedIncomeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FixedIncomes.
     */
    data: XOR<FixedIncomeUpdateManyMutationInput, FixedIncomeUncheckedUpdateManyInput>
    /**
     * Filter which FixedIncomes to update
     */
    where?: FixedIncomeWhereInput
  }

  /**
   * FixedIncome upsert
   */
  export type FixedIncomeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedIncome
     */
    select?: FixedIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedIncomeInclude<ExtArgs> | null
    /**
     * The filter to search for the FixedIncome to update in case it exists.
     */
    where: FixedIncomeWhereUniqueInput
    /**
     * In case the FixedIncome found by the `where` argument doesn't exist, create a new FixedIncome with this data.
     */
    create: XOR<FixedIncomeCreateInput, FixedIncomeUncheckedCreateInput>
    /**
     * In case the FixedIncome was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FixedIncomeUpdateInput, FixedIncomeUncheckedUpdateInput>
  }

  /**
   * FixedIncome delete
   */
  export type FixedIncomeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedIncome
     */
    select?: FixedIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedIncomeInclude<ExtArgs> | null
    /**
     * Filter which FixedIncome to delete.
     */
    where: FixedIncomeWhereUniqueInput
  }

  /**
   * FixedIncome deleteMany
   */
  export type FixedIncomeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FixedIncomes to delete
     */
    where?: FixedIncomeWhereInput
  }

  /**
   * FixedIncome without action
   */
  export type FixedIncomeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedIncome
     */
    select?: FixedIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedIncomeInclude<ExtArgs> | null
  }


  /**
   * Model FixedCharge
   */

  export type AggregateFixedCharge = {
    _count: FixedChargeCountAggregateOutputType | null
    _avg: FixedChargeAvgAggregateOutputType | null
    _sum: FixedChargeSumAggregateOutputType | null
    _min: FixedChargeMinAggregateOutputType | null
    _max: FixedChargeMaxAggregateOutputType | null
  }

  export type FixedChargeAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type FixedChargeSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type FixedChargeMinAggregateOutputType = {
    id: string | null
    name: string | null
    amount: Decimal | null
    userId: string | null
    createdAt: Date | null
  }

  export type FixedChargeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    amount: Decimal | null
    userId: string | null
    createdAt: Date | null
  }

  export type FixedChargeCountAggregateOutputType = {
    id: number
    name: number
    amount: number
    userId: number
    createdAt: number
    _all: number
  }


  export type FixedChargeAvgAggregateInputType = {
    amount?: true
  }

  export type FixedChargeSumAggregateInputType = {
    amount?: true
  }

  export type FixedChargeMinAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    userId?: true
    createdAt?: true
  }

  export type FixedChargeMaxAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    userId?: true
    createdAt?: true
  }

  export type FixedChargeCountAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type FixedChargeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FixedCharge to aggregate.
     */
    where?: FixedChargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FixedCharges to fetch.
     */
    orderBy?: FixedChargeOrderByWithRelationInput | FixedChargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FixedChargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FixedCharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FixedCharges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FixedCharges
    **/
    _count?: true | FixedChargeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FixedChargeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FixedChargeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FixedChargeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FixedChargeMaxAggregateInputType
  }

  export type GetFixedChargeAggregateType<T extends FixedChargeAggregateArgs> = {
        [P in keyof T & keyof AggregateFixedCharge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFixedCharge[P]>
      : GetScalarType<T[P], AggregateFixedCharge[P]>
  }




  export type FixedChargeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FixedChargeWhereInput
    orderBy?: FixedChargeOrderByWithAggregationInput | FixedChargeOrderByWithAggregationInput[]
    by: FixedChargeScalarFieldEnum[] | FixedChargeScalarFieldEnum
    having?: FixedChargeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FixedChargeCountAggregateInputType | true
    _avg?: FixedChargeAvgAggregateInputType
    _sum?: FixedChargeSumAggregateInputType
    _min?: FixedChargeMinAggregateInputType
    _max?: FixedChargeMaxAggregateInputType
  }

  export type FixedChargeGroupByOutputType = {
    id: string
    name: string
    amount: Decimal
    userId: string
    createdAt: Date
    _count: FixedChargeCountAggregateOutputType | null
    _avg: FixedChargeAvgAggregateOutputType | null
    _sum: FixedChargeSumAggregateOutputType | null
    _min: FixedChargeMinAggregateOutputType | null
    _max: FixedChargeMaxAggregateOutputType | null
  }

  type GetFixedChargeGroupByPayload<T extends FixedChargeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FixedChargeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FixedChargeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FixedChargeGroupByOutputType[P]>
            : GetScalarType<T[P], FixedChargeGroupByOutputType[P]>
        }
      >
    >


  export type FixedChargeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    amount?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fixedCharge"]>

  export type FixedChargeSelectScalar = {
    id?: boolean
    name?: boolean
    amount?: boolean
    userId?: boolean
    createdAt?: boolean
  }


  export type FixedChargeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $FixedChargePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FixedCharge"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      amount: Prisma.Decimal
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["fixedCharge"]>
    composites: {}
  }


  type FixedChargeGetPayload<S extends boolean | null | undefined | FixedChargeDefaultArgs> = $Result.GetResult<Prisma.$FixedChargePayload, S>

  type FixedChargeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FixedChargeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FixedChargeCountAggregateInputType | true
    }

  export interface FixedChargeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FixedCharge'], meta: { name: 'FixedCharge' } }
    /**
     * Find zero or one FixedCharge that matches the filter.
     * @param {FixedChargeFindUniqueArgs} args - Arguments to find a FixedCharge
     * @example
     * // Get one FixedCharge
     * const fixedCharge = await prisma.fixedCharge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FixedChargeFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, FixedChargeFindUniqueArgs<ExtArgs>>
    ): Prisma__FixedChargeClient<$Result.GetResult<Prisma.$FixedChargePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one FixedCharge that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FixedChargeFindUniqueOrThrowArgs} args - Arguments to find a FixedCharge
     * @example
     * // Get one FixedCharge
     * const fixedCharge = await prisma.fixedCharge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends FixedChargeFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, FixedChargeFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__FixedChargeClient<$Result.GetResult<Prisma.$FixedChargePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first FixedCharge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedChargeFindFirstArgs} args - Arguments to find a FixedCharge
     * @example
     * // Get one FixedCharge
     * const fixedCharge = await prisma.fixedCharge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FixedChargeFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, FixedChargeFindFirstArgs<ExtArgs>>
    ): Prisma__FixedChargeClient<$Result.GetResult<Prisma.$FixedChargePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first FixedCharge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedChargeFindFirstOrThrowArgs} args - Arguments to find a FixedCharge
     * @example
     * // Get one FixedCharge
     * const fixedCharge = await prisma.fixedCharge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends FixedChargeFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, FixedChargeFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__FixedChargeClient<$Result.GetResult<Prisma.$FixedChargePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more FixedCharges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedChargeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FixedCharges
     * const fixedCharges = await prisma.fixedCharge.findMany()
     * 
     * // Get first 10 FixedCharges
     * const fixedCharges = await prisma.fixedCharge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fixedChargeWithIdOnly = await prisma.fixedCharge.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FixedChargeFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FixedChargeFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FixedChargePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a FixedCharge.
     * @param {FixedChargeCreateArgs} args - Arguments to create a FixedCharge.
     * @example
     * // Create one FixedCharge
     * const FixedCharge = await prisma.fixedCharge.create({
     *   data: {
     *     // ... data to create a FixedCharge
     *   }
     * })
     * 
    **/
    create<T extends FixedChargeCreateArgs<ExtArgs>>(
      args: SelectSubset<T, FixedChargeCreateArgs<ExtArgs>>
    ): Prisma__FixedChargeClient<$Result.GetResult<Prisma.$FixedChargePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many FixedCharges.
     * @param {FixedChargeCreateManyArgs} args - Arguments to create many FixedCharges.
     * @example
     * // Create many FixedCharges
     * const fixedCharge = await prisma.fixedCharge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends FixedChargeCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FixedChargeCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FixedCharges and returns the data saved in the database.
     * @param {FixedChargeCreateManyAndReturnArgs} args - Arguments to create many FixedCharges.
     * @example
     * // Create many FixedCharges
     * const fixedCharge = await prisma.fixedCharge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FixedCharges and only return the `id`
     * const fixedChargeWithIdOnly = await prisma.fixedCharge.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends FixedChargeCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, FixedChargeCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FixedChargePayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a FixedCharge.
     * @param {FixedChargeDeleteArgs} args - Arguments to delete one FixedCharge.
     * @example
     * // Delete one FixedCharge
     * const FixedCharge = await prisma.fixedCharge.delete({
     *   where: {
     *     // ... filter to delete one FixedCharge
     *   }
     * })
     * 
    **/
    delete<T extends FixedChargeDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, FixedChargeDeleteArgs<ExtArgs>>
    ): Prisma__FixedChargeClient<$Result.GetResult<Prisma.$FixedChargePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one FixedCharge.
     * @param {FixedChargeUpdateArgs} args - Arguments to update one FixedCharge.
     * @example
     * // Update one FixedCharge
     * const fixedCharge = await prisma.fixedCharge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FixedChargeUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, FixedChargeUpdateArgs<ExtArgs>>
    ): Prisma__FixedChargeClient<$Result.GetResult<Prisma.$FixedChargePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more FixedCharges.
     * @param {FixedChargeDeleteManyArgs} args - Arguments to filter FixedCharges to delete.
     * @example
     * // Delete a few FixedCharges
     * const { count } = await prisma.fixedCharge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FixedChargeDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FixedChargeDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FixedCharges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedChargeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FixedCharges
     * const fixedCharge = await prisma.fixedCharge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FixedChargeUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, FixedChargeUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FixedCharge.
     * @param {FixedChargeUpsertArgs} args - Arguments to update or create a FixedCharge.
     * @example
     * // Update or create a FixedCharge
     * const fixedCharge = await prisma.fixedCharge.upsert({
     *   create: {
     *     // ... data to create a FixedCharge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FixedCharge we want to update
     *   }
     * })
    **/
    upsert<T extends FixedChargeUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, FixedChargeUpsertArgs<ExtArgs>>
    ): Prisma__FixedChargeClient<$Result.GetResult<Prisma.$FixedChargePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of FixedCharges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedChargeCountArgs} args - Arguments to filter FixedCharges to count.
     * @example
     * // Count the number of FixedCharges
     * const count = await prisma.fixedCharge.count({
     *   where: {
     *     // ... the filter for the FixedCharges we want to count
     *   }
     * })
    **/
    count<T extends FixedChargeCountArgs>(
      args?: Subset<T, FixedChargeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FixedChargeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FixedCharge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedChargeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FixedChargeAggregateArgs>(args: Subset<T, FixedChargeAggregateArgs>): Prisma.PrismaPromise<GetFixedChargeAggregateType<T>>

    /**
     * Group by FixedCharge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FixedChargeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FixedChargeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FixedChargeGroupByArgs['orderBy'] }
        : { orderBy?: FixedChargeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FixedChargeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFixedChargeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FixedCharge model
   */
  readonly fields: FixedChargeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FixedCharge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FixedChargeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the FixedCharge model
   */ 
  interface FixedChargeFieldRefs {
    readonly id: FieldRef<"FixedCharge", 'String'>
    readonly name: FieldRef<"FixedCharge", 'String'>
    readonly amount: FieldRef<"FixedCharge", 'Decimal'>
    readonly userId: FieldRef<"FixedCharge", 'String'>
    readonly createdAt: FieldRef<"FixedCharge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FixedCharge findUnique
   */
  export type FixedChargeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedCharge
     */
    select?: FixedChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedChargeInclude<ExtArgs> | null
    /**
     * Filter, which FixedCharge to fetch.
     */
    where: FixedChargeWhereUniqueInput
  }

  /**
   * FixedCharge findUniqueOrThrow
   */
  export type FixedChargeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedCharge
     */
    select?: FixedChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedChargeInclude<ExtArgs> | null
    /**
     * Filter, which FixedCharge to fetch.
     */
    where: FixedChargeWhereUniqueInput
  }

  /**
   * FixedCharge findFirst
   */
  export type FixedChargeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedCharge
     */
    select?: FixedChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedChargeInclude<ExtArgs> | null
    /**
     * Filter, which FixedCharge to fetch.
     */
    where?: FixedChargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FixedCharges to fetch.
     */
    orderBy?: FixedChargeOrderByWithRelationInput | FixedChargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FixedCharges.
     */
    cursor?: FixedChargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FixedCharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FixedCharges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FixedCharges.
     */
    distinct?: FixedChargeScalarFieldEnum | FixedChargeScalarFieldEnum[]
  }

  /**
   * FixedCharge findFirstOrThrow
   */
  export type FixedChargeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedCharge
     */
    select?: FixedChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedChargeInclude<ExtArgs> | null
    /**
     * Filter, which FixedCharge to fetch.
     */
    where?: FixedChargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FixedCharges to fetch.
     */
    orderBy?: FixedChargeOrderByWithRelationInput | FixedChargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FixedCharges.
     */
    cursor?: FixedChargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FixedCharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FixedCharges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FixedCharges.
     */
    distinct?: FixedChargeScalarFieldEnum | FixedChargeScalarFieldEnum[]
  }

  /**
   * FixedCharge findMany
   */
  export type FixedChargeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedCharge
     */
    select?: FixedChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedChargeInclude<ExtArgs> | null
    /**
     * Filter, which FixedCharges to fetch.
     */
    where?: FixedChargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FixedCharges to fetch.
     */
    orderBy?: FixedChargeOrderByWithRelationInput | FixedChargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FixedCharges.
     */
    cursor?: FixedChargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FixedCharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FixedCharges.
     */
    skip?: number
    distinct?: FixedChargeScalarFieldEnum | FixedChargeScalarFieldEnum[]
  }

  /**
   * FixedCharge create
   */
  export type FixedChargeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedCharge
     */
    select?: FixedChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedChargeInclude<ExtArgs> | null
    /**
     * The data needed to create a FixedCharge.
     */
    data: XOR<FixedChargeCreateInput, FixedChargeUncheckedCreateInput>
  }

  /**
   * FixedCharge createMany
   */
  export type FixedChargeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FixedCharges.
     */
    data: FixedChargeCreateManyInput | FixedChargeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FixedCharge createManyAndReturn
   */
  export type FixedChargeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedCharge
     */
    select?: FixedChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedChargeInclude<ExtArgs> | null
    /**
     * The data used to create many FixedCharges.
     */
    data: FixedChargeCreateManyInput | FixedChargeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FixedCharge update
   */
  export type FixedChargeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedCharge
     */
    select?: FixedChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedChargeInclude<ExtArgs> | null
    /**
     * The data needed to update a FixedCharge.
     */
    data: XOR<FixedChargeUpdateInput, FixedChargeUncheckedUpdateInput>
    /**
     * Choose, which FixedCharge to update.
     */
    where: FixedChargeWhereUniqueInput
  }

  /**
   * FixedCharge updateMany
   */
  export type FixedChargeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FixedCharges.
     */
    data: XOR<FixedChargeUpdateManyMutationInput, FixedChargeUncheckedUpdateManyInput>
    /**
     * Filter which FixedCharges to update
     */
    where?: FixedChargeWhereInput
  }

  /**
   * FixedCharge upsert
   */
  export type FixedChargeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedCharge
     */
    select?: FixedChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedChargeInclude<ExtArgs> | null
    /**
     * The filter to search for the FixedCharge to update in case it exists.
     */
    where: FixedChargeWhereUniqueInput
    /**
     * In case the FixedCharge found by the `where` argument doesn't exist, create a new FixedCharge with this data.
     */
    create: XOR<FixedChargeCreateInput, FixedChargeUncheckedCreateInput>
    /**
     * In case the FixedCharge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FixedChargeUpdateInput, FixedChargeUncheckedUpdateInput>
  }

  /**
   * FixedCharge delete
   */
  export type FixedChargeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedCharge
     */
    select?: FixedChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedChargeInclude<ExtArgs> | null
    /**
     * Filter which FixedCharge to delete.
     */
    where: FixedChargeWhereUniqueInput
  }

  /**
   * FixedCharge deleteMany
   */
  export type FixedChargeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FixedCharges to delete
     */
    where?: FixedChargeWhereInput
  }

  /**
   * FixedCharge without action
   */
  export type FixedChargeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FixedCharge
     */
    select?: FixedChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FixedChargeInclude<ExtArgs> | null
  }


  /**
   * Model MonthlyBudget
   */

  export type AggregateMonthlyBudget = {
    _count: MonthlyBudgetCountAggregateOutputType | null
    _avg: MonthlyBudgetAvgAggregateOutputType | null
    _sum: MonthlyBudgetSumAggregateOutputType | null
    _min: MonthlyBudgetMinAggregateOutputType | null
    _max: MonthlyBudgetMaxAggregateOutputType | null
  }

  export type MonthlyBudgetAvgAggregateOutputType = {
    month: number | null
    year: number | null
    remainingBudget: Decimal | null
    weeklyBudget: Decimal | null
    numberOfWeeks: number | null
  }

  export type MonthlyBudgetSumAggregateOutputType = {
    month: number | null
    year: number | null
    remainingBudget: Decimal | null
    weeklyBudget: Decimal | null
    numberOfWeeks: number | null
  }

  export type MonthlyBudgetMinAggregateOutputType = {
    id: string | null
    month: number | null
    year: number | null
    isCurrent: boolean | null
    remainingBudget: Decimal | null
    weeklyBudget: Decimal | null
    numberOfWeeks: number | null
    userId: string | null
    createdAt: Date | null
  }

  export type MonthlyBudgetMaxAggregateOutputType = {
    id: string | null
    month: number | null
    year: number | null
    isCurrent: boolean | null
    remainingBudget: Decimal | null
    weeklyBudget: Decimal | null
    numberOfWeeks: number | null
    userId: string | null
    createdAt: Date | null
  }

  export type MonthlyBudgetCountAggregateOutputType = {
    id: number
    month: number
    year: number
    isCurrent: number
    remainingBudget: number
    weeklyBudget: number
    numberOfWeeks: number
    userId: number
    createdAt: number
    _all: number
  }


  export type MonthlyBudgetAvgAggregateInputType = {
    month?: true
    year?: true
    remainingBudget?: true
    weeklyBudget?: true
    numberOfWeeks?: true
  }

  export type MonthlyBudgetSumAggregateInputType = {
    month?: true
    year?: true
    remainingBudget?: true
    weeklyBudget?: true
    numberOfWeeks?: true
  }

  export type MonthlyBudgetMinAggregateInputType = {
    id?: true
    month?: true
    year?: true
    isCurrent?: true
    remainingBudget?: true
    weeklyBudget?: true
    numberOfWeeks?: true
    userId?: true
    createdAt?: true
  }

  export type MonthlyBudgetMaxAggregateInputType = {
    id?: true
    month?: true
    year?: true
    isCurrent?: true
    remainingBudget?: true
    weeklyBudget?: true
    numberOfWeeks?: true
    userId?: true
    createdAt?: true
  }

  export type MonthlyBudgetCountAggregateInputType = {
    id?: true
    month?: true
    year?: true
    isCurrent?: true
    remainingBudget?: true
    weeklyBudget?: true
    numberOfWeeks?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type MonthlyBudgetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyBudget to aggregate.
     */
    where?: MonthlyBudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyBudgets to fetch.
     */
    orderBy?: MonthlyBudgetOrderByWithRelationInput | MonthlyBudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MonthlyBudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyBudgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyBudgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MonthlyBudgets
    **/
    _count?: true | MonthlyBudgetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MonthlyBudgetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MonthlyBudgetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MonthlyBudgetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MonthlyBudgetMaxAggregateInputType
  }

  export type GetMonthlyBudgetAggregateType<T extends MonthlyBudgetAggregateArgs> = {
        [P in keyof T & keyof AggregateMonthlyBudget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMonthlyBudget[P]>
      : GetScalarType<T[P], AggregateMonthlyBudget[P]>
  }




  export type MonthlyBudgetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyBudgetWhereInput
    orderBy?: MonthlyBudgetOrderByWithAggregationInput | MonthlyBudgetOrderByWithAggregationInput[]
    by: MonthlyBudgetScalarFieldEnum[] | MonthlyBudgetScalarFieldEnum
    having?: MonthlyBudgetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MonthlyBudgetCountAggregateInputType | true
    _avg?: MonthlyBudgetAvgAggregateInputType
    _sum?: MonthlyBudgetSumAggregateInputType
    _min?: MonthlyBudgetMinAggregateInputType
    _max?: MonthlyBudgetMaxAggregateInputType
  }

  export type MonthlyBudgetGroupByOutputType = {
    id: string
    month: number
    year: number
    isCurrent: boolean
    remainingBudget: Decimal
    weeklyBudget: Decimal
    numberOfWeeks: number
    userId: string
    createdAt: Date
    _count: MonthlyBudgetCountAggregateOutputType | null
    _avg: MonthlyBudgetAvgAggregateOutputType | null
    _sum: MonthlyBudgetSumAggregateOutputType | null
    _min: MonthlyBudgetMinAggregateOutputType | null
    _max: MonthlyBudgetMaxAggregateOutputType | null
  }

  type GetMonthlyBudgetGroupByPayload<T extends MonthlyBudgetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MonthlyBudgetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MonthlyBudgetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MonthlyBudgetGroupByOutputType[P]>
            : GetScalarType<T[P], MonthlyBudgetGroupByOutputType[P]>
        }
      >
    >


  export type MonthlyBudgetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    month?: boolean
    year?: boolean
    isCurrent?: boolean
    remainingBudget?: boolean
    weeklyBudget?: boolean
    numberOfWeeks?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    incomes?: boolean | MonthlyBudget$incomesArgs<ExtArgs>
    charges?: boolean | MonthlyBudget$chargesArgs<ExtArgs>
    expenses?: boolean | MonthlyBudget$expensesArgs<ExtArgs>
    _count?: boolean | MonthlyBudgetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyBudget"]>

  export type MonthlyBudgetSelectScalar = {
    id?: boolean
    month?: boolean
    year?: boolean
    isCurrent?: boolean
    remainingBudget?: boolean
    weeklyBudget?: boolean
    numberOfWeeks?: boolean
    userId?: boolean
    createdAt?: boolean
  }


  export type MonthlyBudgetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    incomes?: boolean | MonthlyBudget$incomesArgs<ExtArgs>
    charges?: boolean | MonthlyBudget$chargesArgs<ExtArgs>
    expenses?: boolean | MonthlyBudget$expensesArgs<ExtArgs>
    _count?: boolean | MonthlyBudgetCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $MonthlyBudgetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MonthlyBudget"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      incomes: Prisma.$MonthlyIncomePayload<ExtArgs>[]
      charges: Prisma.$MonthlyChargePayload<ExtArgs>[]
      expenses: Prisma.$WeeklyExpensePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      month: number
      year: number
      isCurrent: boolean
      remainingBudget: Prisma.Decimal
      weeklyBudget: Prisma.Decimal
      numberOfWeeks: number
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["monthlyBudget"]>
    composites: {}
  }


  type MonthlyBudgetGetPayload<S extends boolean | null | undefined | MonthlyBudgetDefaultArgs> = $Result.GetResult<Prisma.$MonthlyBudgetPayload, S>

  type MonthlyBudgetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MonthlyBudgetFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MonthlyBudgetCountAggregateInputType | true
    }

  export interface MonthlyBudgetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MonthlyBudget'], meta: { name: 'MonthlyBudget' } }
    /**
     * Find zero or one MonthlyBudget that matches the filter.
     * @param {MonthlyBudgetFindUniqueArgs} args - Arguments to find a MonthlyBudget
     * @example
     * // Get one MonthlyBudget
     * const monthlyBudget = await prisma.monthlyBudget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MonthlyBudgetFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyBudgetFindUniqueArgs<ExtArgs>>
    ): Prisma__MonthlyBudgetClient<$Result.GetResult<Prisma.$MonthlyBudgetPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one MonthlyBudget that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MonthlyBudgetFindUniqueOrThrowArgs} args - Arguments to find a MonthlyBudget
     * @example
     * // Get one MonthlyBudget
     * const monthlyBudget = await prisma.monthlyBudget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MonthlyBudgetFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyBudgetFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__MonthlyBudgetClient<$Result.GetResult<Prisma.$MonthlyBudgetPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first MonthlyBudget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyBudgetFindFirstArgs} args - Arguments to find a MonthlyBudget
     * @example
     * // Get one MonthlyBudget
     * const monthlyBudget = await prisma.monthlyBudget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MonthlyBudgetFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyBudgetFindFirstArgs<ExtArgs>>
    ): Prisma__MonthlyBudgetClient<$Result.GetResult<Prisma.$MonthlyBudgetPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first MonthlyBudget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyBudgetFindFirstOrThrowArgs} args - Arguments to find a MonthlyBudget
     * @example
     * // Get one MonthlyBudget
     * const monthlyBudget = await prisma.monthlyBudget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MonthlyBudgetFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyBudgetFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__MonthlyBudgetClient<$Result.GetResult<Prisma.$MonthlyBudgetPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more MonthlyBudgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyBudgetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MonthlyBudgets
     * const monthlyBudgets = await prisma.monthlyBudget.findMany()
     * 
     * // Get first 10 MonthlyBudgets
     * const monthlyBudgets = await prisma.monthlyBudget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const monthlyBudgetWithIdOnly = await prisma.monthlyBudget.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MonthlyBudgetFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyBudgetFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyBudgetPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a MonthlyBudget.
     * @param {MonthlyBudgetCreateArgs} args - Arguments to create a MonthlyBudget.
     * @example
     * // Create one MonthlyBudget
     * const MonthlyBudget = await prisma.monthlyBudget.create({
     *   data: {
     *     // ... data to create a MonthlyBudget
     *   }
     * })
     * 
    **/
    create<T extends MonthlyBudgetCreateArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyBudgetCreateArgs<ExtArgs>>
    ): Prisma__MonthlyBudgetClient<$Result.GetResult<Prisma.$MonthlyBudgetPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many MonthlyBudgets.
     * @param {MonthlyBudgetCreateManyArgs} args - Arguments to create many MonthlyBudgets.
     * @example
     * // Create many MonthlyBudgets
     * const monthlyBudget = await prisma.monthlyBudget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends MonthlyBudgetCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyBudgetCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MonthlyBudgets and returns the data saved in the database.
     * @param {MonthlyBudgetCreateManyAndReturnArgs} args - Arguments to create many MonthlyBudgets.
     * @example
     * // Create many MonthlyBudgets
     * const monthlyBudget = await prisma.monthlyBudget.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MonthlyBudgets and only return the `id`
     * const monthlyBudgetWithIdOnly = await prisma.monthlyBudget.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends MonthlyBudgetCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyBudgetCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyBudgetPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a MonthlyBudget.
     * @param {MonthlyBudgetDeleteArgs} args - Arguments to delete one MonthlyBudget.
     * @example
     * // Delete one MonthlyBudget
     * const MonthlyBudget = await prisma.monthlyBudget.delete({
     *   where: {
     *     // ... filter to delete one MonthlyBudget
     *   }
     * })
     * 
    **/
    delete<T extends MonthlyBudgetDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyBudgetDeleteArgs<ExtArgs>>
    ): Prisma__MonthlyBudgetClient<$Result.GetResult<Prisma.$MonthlyBudgetPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one MonthlyBudget.
     * @param {MonthlyBudgetUpdateArgs} args - Arguments to update one MonthlyBudget.
     * @example
     * // Update one MonthlyBudget
     * const monthlyBudget = await prisma.monthlyBudget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MonthlyBudgetUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyBudgetUpdateArgs<ExtArgs>>
    ): Prisma__MonthlyBudgetClient<$Result.GetResult<Prisma.$MonthlyBudgetPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more MonthlyBudgets.
     * @param {MonthlyBudgetDeleteManyArgs} args - Arguments to filter MonthlyBudgets to delete.
     * @example
     * // Delete a few MonthlyBudgets
     * const { count } = await prisma.monthlyBudget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MonthlyBudgetDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyBudgetDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyBudgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyBudgetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MonthlyBudgets
     * const monthlyBudget = await prisma.monthlyBudget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MonthlyBudgetUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyBudgetUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MonthlyBudget.
     * @param {MonthlyBudgetUpsertArgs} args - Arguments to update or create a MonthlyBudget.
     * @example
     * // Update or create a MonthlyBudget
     * const monthlyBudget = await prisma.monthlyBudget.upsert({
     *   create: {
     *     // ... data to create a MonthlyBudget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MonthlyBudget we want to update
     *   }
     * })
    **/
    upsert<T extends MonthlyBudgetUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyBudgetUpsertArgs<ExtArgs>>
    ): Prisma__MonthlyBudgetClient<$Result.GetResult<Prisma.$MonthlyBudgetPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of MonthlyBudgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyBudgetCountArgs} args - Arguments to filter MonthlyBudgets to count.
     * @example
     * // Count the number of MonthlyBudgets
     * const count = await prisma.monthlyBudget.count({
     *   where: {
     *     // ... the filter for the MonthlyBudgets we want to count
     *   }
     * })
    **/
    count<T extends MonthlyBudgetCountArgs>(
      args?: Subset<T, MonthlyBudgetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MonthlyBudgetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MonthlyBudget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyBudgetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MonthlyBudgetAggregateArgs>(args: Subset<T, MonthlyBudgetAggregateArgs>): Prisma.PrismaPromise<GetMonthlyBudgetAggregateType<T>>

    /**
     * Group by MonthlyBudget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyBudgetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MonthlyBudgetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MonthlyBudgetGroupByArgs['orderBy'] }
        : { orderBy?: MonthlyBudgetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MonthlyBudgetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMonthlyBudgetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MonthlyBudget model
   */
  readonly fields: MonthlyBudgetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MonthlyBudget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MonthlyBudgetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    incomes<T extends MonthlyBudget$incomesArgs<ExtArgs> = {}>(args?: Subset<T, MonthlyBudget$incomesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyIncomePayload<ExtArgs>, T, 'findMany'> | Null>;

    charges<T extends MonthlyBudget$chargesArgs<ExtArgs> = {}>(args?: Subset<T, MonthlyBudget$chargesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyChargePayload<ExtArgs>, T, 'findMany'> | Null>;

    expenses<T extends MonthlyBudget$expensesArgs<ExtArgs> = {}>(args?: Subset<T, MonthlyBudget$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyExpensePayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the MonthlyBudget model
   */ 
  interface MonthlyBudgetFieldRefs {
    readonly id: FieldRef<"MonthlyBudget", 'String'>
    readonly month: FieldRef<"MonthlyBudget", 'Int'>
    readonly year: FieldRef<"MonthlyBudget", 'Int'>
    readonly isCurrent: FieldRef<"MonthlyBudget", 'Boolean'>
    readonly remainingBudget: FieldRef<"MonthlyBudget", 'Decimal'>
    readonly weeklyBudget: FieldRef<"MonthlyBudget", 'Decimal'>
    readonly numberOfWeeks: FieldRef<"MonthlyBudget", 'Int'>
    readonly userId: FieldRef<"MonthlyBudget", 'String'>
    readonly createdAt: FieldRef<"MonthlyBudget", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MonthlyBudget findUnique
   */
  export type MonthlyBudgetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyBudget
     */
    select?: MonthlyBudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyBudgetInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyBudget to fetch.
     */
    where: MonthlyBudgetWhereUniqueInput
  }

  /**
   * MonthlyBudget findUniqueOrThrow
   */
  export type MonthlyBudgetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyBudget
     */
    select?: MonthlyBudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyBudgetInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyBudget to fetch.
     */
    where: MonthlyBudgetWhereUniqueInput
  }

  /**
   * MonthlyBudget findFirst
   */
  export type MonthlyBudgetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyBudget
     */
    select?: MonthlyBudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyBudgetInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyBudget to fetch.
     */
    where?: MonthlyBudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyBudgets to fetch.
     */
    orderBy?: MonthlyBudgetOrderByWithRelationInput | MonthlyBudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyBudgets.
     */
    cursor?: MonthlyBudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyBudgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyBudgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyBudgets.
     */
    distinct?: MonthlyBudgetScalarFieldEnum | MonthlyBudgetScalarFieldEnum[]
  }

  /**
   * MonthlyBudget findFirstOrThrow
   */
  export type MonthlyBudgetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyBudget
     */
    select?: MonthlyBudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyBudgetInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyBudget to fetch.
     */
    where?: MonthlyBudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyBudgets to fetch.
     */
    orderBy?: MonthlyBudgetOrderByWithRelationInput | MonthlyBudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyBudgets.
     */
    cursor?: MonthlyBudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyBudgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyBudgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyBudgets.
     */
    distinct?: MonthlyBudgetScalarFieldEnum | MonthlyBudgetScalarFieldEnum[]
  }

  /**
   * MonthlyBudget findMany
   */
  export type MonthlyBudgetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyBudget
     */
    select?: MonthlyBudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyBudgetInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyBudgets to fetch.
     */
    where?: MonthlyBudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyBudgets to fetch.
     */
    orderBy?: MonthlyBudgetOrderByWithRelationInput | MonthlyBudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MonthlyBudgets.
     */
    cursor?: MonthlyBudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyBudgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyBudgets.
     */
    skip?: number
    distinct?: MonthlyBudgetScalarFieldEnum | MonthlyBudgetScalarFieldEnum[]
  }

  /**
   * MonthlyBudget create
   */
  export type MonthlyBudgetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyBudget
     */
    select?: MonthlyBudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyBudgetInclude<ExtArgs> | null
    /**
     * The data needed to create a MonthlyBudget.
     */
    data: XOR<MonthlyBudgetCreateInput, MonthlyBudgetUncheckedCreateInput>
  }

  /**
   * MonthlyBudget createMany
   */
  export type MonthlyBudgetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MonthlyBudgets.
     */
    data: MonthlyBudgetCreateManyInput | MonthlyBudgetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MonthlyBudget createManyAndReturn
   */
  export type MonthlyBudgetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyBudget
     */
    select?: MonthlyBudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyBudgetInclude<ExtArgs> | null
    /**
     * The data used to create many MonthlyBudgets.
     */
    data: MonthlyBudgetCreateManyInput | MonthlyBudgetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MonthlyBudget update
   */
  export type MonthlyBudgetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyBudget
     */
    select?: MonthlyBudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyBudgetInclude<ExtArgs> | null
    /**
     * The data needed to update a MonthlyBudget.
     */
    data: XOR<MonthlyBudgetUpdateInput, MonthlyBudgetUncheckedUpdateInput>
    /**
     * Choose, which MonthlyBudget to update.
     */
    where: MonthlyBudgetWhereUniqueInput
  }

  /**
   * MonthlyBudget updateMany
   */
  export type MonthlyBudgetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MonthlyBudgets.
     */
    data: XOR<MonthlyBudgetUpdateManyMutationInput, MonthlyBudgetUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyBudgets to update
     */
    where?: MonthlyBudgetWhereInput
  }

  /**
   * MonthlyBudget upsert
   */
  export type MonthlyBudgetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyBudget
     */
    select?: MonthlyBudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyBudgetInclude<ExtArgs> | null
    /**
     * The filter to search for the MonthlyBudget to update in case it exists.
     */
    where: MonthlyBudgetWhereUniqueInput
    /**
     * In case the MonthlyBudget found by the `where` argument doesn't exist, create a new MonthlyBudget with this data.
     */
    create: XOR<MonthlyBudgetCreateInput, MonthlyBudgetUncheckedCreateInput>
    /**
     * In case the MonthlyBudget was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MonthlyBudgetUpdateInput, MonthlyBudgetUncheckedUpdateInput>
  }

  /**
   * MonthlyBudget delete
   */
  export type MonthlyBudgetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyBudget
     */
    select?: MonthlyBudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyBudgetInclude<ExtArgs> | null
    /**
     * Filter which MonthlyBudget to delete.
     */
    where: MonthlyBudgetWhereUniqueInput
  }

  /**
   * MonthlyBudget deleteMany
   */
  export type MonthlyBudgetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyBudgets to delete
     */
    where?: MonthlyBudgetWhereInput
  }

  /**
   * MonthlyBudget.incomes
   */
  export type MonthlyBudget$incomesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyIncome
     */
    select?: MonthlyIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyIncomeInclude<ExtArgs> | null
    where?: MonthlyIncomeWhereInput
    orderBy?: MonthlyIncomeOrderByWithRelationInput | MonthlyIncomeOrderByWithRelationInput[]
    cursor?: MonthlyIncomeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MonthlyIncomeScalarFieldEnum | MonthlyIncomeScalarFieldEnum[]
  }

  /**
   * MonthlyBudget.charges
   */
  export type MonthlyBudget$chargesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyCharge
     */
    select?: MonthlyChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyChargeInclude<ExtArgs> | null
    where?: MonthlyChargeWhereInput
    orderBy?: MonthlyChargeOrderByWithRelationInput | MonthlyChargeOrderByWithRelationInput[]
    cursor?: MonthlyChargeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MonthlyChargeScalarFieldEnum | MonthlyChargeScalarFieldEnum[]
  }

  /**
   * MonthlyBudget.expenses
   */
  export type MonthlyBudget$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyExpense
     */
    select?: WeeklyExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyExpenseInclude<ExtArgs> | null
    where?: WeeklyExpenseWhereInput
    orderBy?: WeeklyExpenseOrderByWithRelationInput | WeeklyExpenseOrderByWithRelationInput[]
    cursor?: WeeklyExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WeeklyExpenseScalarFieldEnum | WeeklyExpenseScalarFieldEnum[]
  }

  /**
   * MonthlyBudget without action
   */
  export type MonthlyBudgetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyBudget
     */
    select?: MonthlyBudgetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyBudgetInclude<ExtArgs> | null
  }


  /**
   * Model MonthlyIncome
   */

  export type AggregateMonthlyIncome = {
    _count: MonthlyIncomeCountAggregateOutputType | null
    _avg: MonthlyIncomeAvgAggregateOutputType | null
    _sum: MonthlyIncomeSumAggregateOutputType | null
    _min: MonthlyIncomeMinAggregateOutputType | null
    _max: MonthlyIncomeMaxAggregateOutputType | null
  }

  export type MonthlyIncomeAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type MonthlyIncomeSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type MonthlyIncomeMinAggregateOutputType = {
    id: string | null
    name: string | null
    amount: Decimal | null
    monthlyBudgetId: string | null
    createdAt: Date | null
  }

  export type MonthlyIncomeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    amount: Decimal | null
    monthlyBudgetId: string | null
    createdAt: Date | null
  }

  export type MonthlyIncomeCountAggregateOutputType = {
    id: number
    name: number
    amount: number
    monthlyBudgetId: number
    createdAt: number
    _all: number
  }


  export type MonthlyIncomeAvgAggregateInputType = {
    amount?: true
  }

  export type MonthlyIncomeSumAggregateInputType = {
    amount?: true
  }

  export type MonthlyIncomeMinAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    monthlyBudgetId?: true
    createdAt?: true
  }

  export type MonthlyIncomeMaxAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    monthlyBudgetId?: true
    createdAt?: true
  }

  export type MonthlyIncomeCountAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    monthlyBudgetId?: true
    createdAt?: true
    _all?: true
  }

  export type MonthlyIncomeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyIncome to aggregate.
     */
    where?: MonthlyIncomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyIncomes to fetch.
     */
    orderBy?: MonthlyIncomeOrderByWithRelationInput | MonthlyIncomeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MonthlyIncomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyIncomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyIncomes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MonthlyIncomes
    **/
    _count?: true | MonthlyIncomeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MonthlyIncomeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MonthlyIncomeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MonthlyIncomeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MonthlyIncomeMaxAggregateInputType
  }

  export type GetMonthlyIncomeAggregateType<T extends MonthlyIncomeAggregateArgs> = {
        [P in keyof T & keyof AggregateMonthlyIncome]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMonthlyIncome[P]>
      : GetScalarType<T[P], AggregateMonthlyIncome[P]>
  }




  export type MonthlyIncomeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyIncomeWhereInput
    orderBy?: MonthlyIncomeOrderByWithAggregationInput | MonthlyIncomeOrderByWithAggregationInput[]
    by: MonthlyIncomeScalarFieldEnum[] | MonthlyIncomeScalarFieldEnum
    having?: MonthlyIncomeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MonthlyIncomeCountAggregateInputType | true
    _avg?: MonthlyIncomeAvgAggregateInputType
    _sum?: MonthlyIncomeSumAggregateInputType
    _min?: MonthlyIncomeMinAggregateInputType
    _max?: MonthlyIncomeMaxAggregateInputType
  }

  export type MonthlyIncomeGroupByOutputType = {
    id: string
    name: string
    amount: Decimal
    monthlyBudgetId: string
    createdAt: Date
    _count: MonthlyIncomeCountAggregateOutputType | null
    _avg: MonthlyIncomeAvgAggregateOutputType | null
    _sum: MonthlyIncomeSumAggregateOutputType | null
    _min: MonthlyIncomeMinAggregateOutputType | null
    _max: MonthlyIncomeMaxAggregateOutputType | null
  }

  type GetMonthlyIncomeGroupByPayload<T extends MonthlyIncomeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MonthlyIncomeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MonthlyIncomeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MonthlyIncomeGroupByOutputType[P]>
            : GetScalarType<T[P], MonthlyIncomeGroupByOutputType[P]>
        }
      >
    >


  export type MonthlyIncomeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    amount?: boolean
    monthlyBudgetId?: boolean
    createdAt?: boolean
    monthlyBudget?: boolean | MonthlyBudgetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyIncome"]>

  export type MonthlyIncomeSelectScalar = {
    id?: boolean
    name?: boolean
    amount?: boolean
    monthlyBudgetId?: boolean
    createdAt?: boolean
  }


  export type MonthlyIncomeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    monthlyBudget?: boolean | MonthlyBudgetDefaultArgs<ExtArgs>
  }


  export type $MonthlyIncomePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MonthlyIncome"
    objects: {
      monthlyBudget: Prisma.$MonthlyBudgetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      amount: Prisma.Decimal
      monthlyBudgetId: string
      createdAt: Date
    }, ExtArgs["result"]["monthlyIncome"]>
    composites: {}
  }


  type MonthlyIncomeGetPayload<S extends boolean | null | undefined | MonthlyIncomeDefaultArgs> = $Result.GetResult<Prisma.$MonthlyIncomePayload, S>

  type MonthlyIncomeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MonthlyIncomeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MonthlyIncomeCountAggregateInputType | true
    }

  export interface MonthlyIncomeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MonthlyIncome'], meta: { name: 'MonthlyIncome' } }
    /**
     * Find zero or one MonthlyIncome that matches the filter.
     * @param {MonthlyIncomeFindUniqueArgs} args - Arguments to find a MonthlyIncome
     * @example
     * // Get one MonthlyIncome
     * const monthlyIncome = await prisma.monthlyIncome.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MonthlyIncomeFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyIncomeFindUniqueArgs<ExtArgs>>
    ): Prisma__MonthlyIncomeClient<$Result.GetResult<Prisma.$MonthlyIncomePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one MonthlyIncome that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MonthlyIncomeFindUniqueOrThrowArgs} args - Arguments to find a MonthlyIncome
     * @example
     * // Get one MonthlyIncome
     * const monthlyIncome = await prisma.monthlyIncome.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MonthlyIncomeFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyIncomeFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__MonthlyIncomeClient<$Result.GetResult<Prisma.$MonthlyIncomePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first MonthlyIncome that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyIncomeFindFirstArgs} args - Arguments to find a MonthlyIncome
     * @example
     * // Get one MonthlyIncome
     * const monthlyIncome = await prisma.monthlyIncome.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MonthlyIncomeFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyIncomeFindFirstArgs<ExtArgs>>
    ): Prisma__MonthlyIncomeClient<$Result.GetResult<Prisma.$MonthlyIncomePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first MonthlyIncome that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyIncomeFindFirstOrThrowArgs} args - Arguments to find a MonthlyIncome
     * @example
     * // Get one MonthlyIncome
     * const monthlyIncome = await prisma.monthlyIncome.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MonthlyIncomeFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyIncomeFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__MonthlyIncomeClient<$Result.GetResult<Prisma.$MonthlyIncomePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more MonthlyIncomes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyIncomeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MonthlyIncomes
     * const monthlyIncomes = await prisma.monthlyIncome.findMany()
     * 
     * // Get first 10 MonthlyIncomes
     * const monthlyIncomes = await prisma.monthlyIncome.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const monthlyIncomeWithIdOnly = await prisma.monthlyIncome.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MonthlyIncomeFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyIncomeFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyIncomePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a MonthlyIncome.
     * @param {MonthlyIncomeCreateArgs} args - Arguments to create a MonthlyIncome.
     * @example
     * // Create one MonthlyIncome
     * const MonthlyIncome = await prisma.monthlyIncome.create({
     *   data: {
     *     // ... data to create a MonthlyIncome
     *   }
     * })
     * 
    **/
    create<T extends MonthlyIncomeCreateArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyIncomeCreateArgs<ExtArgs>>
    ): Prisma__MonthlyIncomeClient<$Result.GetResult<Prisma.$MonthlyIncomePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many MonthlyIncomes.
     * @param {MonthlyIncomeCreateManyArgs} args - Arguments to create many MonthlyIncomes.
     * @example
     * // Create many MonthlyIncomes
     * const monthlyIncome = await prisma.monthlyIncome.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends MonthlyIncomeCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyIncomeCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MonthlyIncomes and returns the data saved in the database.
     * @param {MonthlyIncomeCreateManyAndReturnArgs} args - Arguments to create many MonthlyIncomes.
     * @example
     * // Create many MonthlyIncomes
     * const monthlyIncome = await prisma.monthlyIncome.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MonthlyIncomes and only return the `id`
     * const monthlyIncomeWithIdOnly = await prisma.monthlyIncome.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends MonthlyIncomeCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyIncomeCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyIncomePayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a MonthlyIncome.
     * @param {MonthlyIncomeDeleteArgs} args - Arguments to delete one MonthlyIncome.
     * @example
     * // Delete one MonthlyIncome
     * const MonthlyIncome = await prisma.monthlyIncome.delete({
     *   where: {
     *     // ... filter to delete one MonthlyIncome
     *   }
     * })
     * 
    **/
    delete<T extends MonthlyIncomeDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyIncomeDeleteArgs<ExtArgs>>
    ): Prisma__MonthlyIncomeClient<$Result.GetResult<Prisma.$MonthlyIncomePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one MonthlyIncome.
     * @param {MonthlyIncomeUpdateArgs} args - Arguments to update one MonthlyIncome.
     * @example
     * // Update one MonthlyIncome
     * const monthlyIncome = await prisma.monthlyIncome.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MonthlyIncomeUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyIncomeUpdateArgs<ExtArgs>>
    ): Prisma__MonthlyIncomeClient<$Result.GetResult<Prisma.$MonthlyIncomePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more MonthlyIncomes.
     * @param {MonthlyIncomeDeleteManyArgs} args - Arguments to filter MonthlyIncomes to delete.
     * @example
     * // Delete a few MonthlyIncomes
     * const { count } = await prisma.monthlyIncome.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MonthlyIncomeDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyIncomeDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyIncomes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyIncomeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MonthlyIncomes
     * const monthlyIncome = await prisma.monthlyIncome.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MonthlyIncomeUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyIncomeUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MonthlyIncome.
     * @param {MonthlyIncomeUpsertArgs} args - Arguments to update or create a MonthlyIncome.
     * @example
     * // Update or create a MonthlyIncome
     * const monthlyIncome = await prisma.monthlyIncome.upsert({
     *   create: {
     *     // ... data to create a MonthlyIncome
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MonthlyIncome we want to update
     *   }
     * })
    **/
    upsert<T extends MonthlyIncomeUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyIncomeUpsertArgs<ExtArgs>>
    ): Prisma__MonthlyIncomeClient<$Result.GetResult<Prisma.$MonthlyIncomePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of MonthlyIncomes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyIncomeCountArgs} args - Arguments to filter MonthlyIncomes to count.
     * @example
     * // Count the number of MonthlyIncomes
     * const count = await prisma.monthlyIncome.count({
     *   where: {
     *     // ... the filter for the MonthlyIncomes we want to count
     *   }
     * })
    **/
    count<T extends MonthlyIncomeCountArgs>(
      args?: Subset<T, MonthlyIncomeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MonthlyIncomeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MonthlyIncome.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyIncomeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MonthlyIncomeAggregateArgs>(args: Subset<T, MonthlyIncomeAggregateArgs>): Prisma.PrismaPromise<GetMonthlyIncomeAggregateType<T>>

    /**
     * Group by MonthlyIncome.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyIncomeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MonthlyIncomeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MonthlyIncomeGroupByArgs['orderBy'] }
        : { orderBy?: MonthlyIncomeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MonthlyIncomeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMonthlyIncomeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MonthlyIncome model
   */
  readonly fields: MonthlyIncomeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MonthlyIncome.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MonthlyIncomeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    monthlyBudget<T extends MonthlyBudgetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MonthlyBudgetDefaultArgs<ExtArgs>>): Prisma__MonthlyBudgetClient<$Result.GetResult<Prisma.$MonthlyBudgetPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the MonthlyIncome model
   */ 
  interface MonthlyIncomeFieldRefs {
    readonly id: FieldRef<"MonthlyIncome", 'String'>
    readonly name: FieldRef<"MonthlyIncome", 'String'>
    readonly amount: FieldRef<"MonthlyIncome", 'Decimal'>
    readonly monthlyBudgetId: FieldRef<"MonthlyIncome", 'String'>
    readonly createdAt: FieldRef<"MonthlyIncome", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MonthlyIncome findUnique
   */
  export type MonthlyIncomeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyIncome
     */
    select?: MonthlyIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyIncomeInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyIncome to fetch.
     */
    where: MonthlyIncomeWhereUniqueInput
  }

  /**
   * MonthlyIncome findUniqueOrThrow
   */
  export type MonthlyIncomeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyIncome
     */
    select?: MonthlyIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyIncomeInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyIncome to fetch.
     */
    where: MonthlyIncomeWhereUniqueInput
  }

  /**
   * MonthlyIncome findFirst
   */
  export type MonthlyIncomeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyIncome
     */
    select?: MonthlyIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyIncomeInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyIncome to fetch.
     */
    where?: MonthlyIncomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyIncomes to fetch.
     */
    orderBy?: MonthlyIncomeOrderByWithRelationInput | MonthlyIncomeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyIncomes.
     */
    cursor?: MonthlyIncomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyIncomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyIncomes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyIncomes.
     */
    distinct?: MonthlyIncomeScalarFieldEnum | MonthlyIncomeScalarFieldEnum[]
  }

  /**
   * MonthlyIncome findFirstOrThrow
   */
  export type MonthlyIncomeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyIncome
     */
    select?: MonthlyIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyIncomeInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyIncome to fetch.
     */
    where?: MonthlyIncomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyIncomes to fetch.
     */
    orderBy?: MonthlyIncomeOrderByWithRelationInput | MonthlyIncomeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyIncomes.
     */
    cursor?: MonthlyIncomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyIncomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyIncomes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyIncomes.
     */
    distinct?: MonthlyIncomeScalarFieldEnum | MonthlyIncomeScalarFieldEnum[]
  }

  /**
   * MonthlyIncome findMany
   */
  export type MonthlyIncomeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyIncome
     */
    select?: MonthlyIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyIncomeInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyIncomes to fetch.
     */
    where?: MonthlyIncomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyIncomes to fetch.
     */
    orderBy?: MonthlyIncomeOrderByWithRelationInput | MonthlyIncomeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MonthlyIncomes.
     */
    cursor?: MonthlyIncomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyIncomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyIncomes.
     */
    skip?: number
    distinct?: MonthlyIncomeScalarFieldEnum | MonthlyIncomeScalarFieldEnum[]
  }

  /**
   * MonthlyIncome create
   */
  export type MonthlyIncomeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyIncome
     */
    select?: MonthlyIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyIncomeInclude<ExtArgs> | null
    /**
     * The data needed to create a MonthlyIncome.
     */
    data: XOR<MonthlyIncomeCreateInput, MonthlyIncomeUncheckedCreateInput>
  }

  /**
   * MonthlyIncome createMany
   */
  export type MonthlyIncomeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MonthlyIncomes.
     */
    data: MonthlyIncomeCreateManyInput | MonthlyIncomeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MonthlyIncome createManyAndReturn
   */
  export type MonthlyIncomeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyIncome
     */
    select?: MonthlyIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyIncomeInclude<ExtArgs> | null
    /**
     * The data used to create many MonthlyIncomes.
     */
    data: MonthlyIncomeCreateManyInput | MonthlyIncomeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MonthlyIncome update
   */
  export type MonthlyIncomeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyIncome
     */
    select?: MonthlyIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyIncomeInclude<ExtArgs> | null
    /**
     * The data needed to update a MonthlyIncome.
     */
    data: XOR<MonthlyIncomeUpdateInput, MonthlyIncomeUncheckedUpdateInput>
    /**
     * Choose, which MonthlyIncome to update.
     */
    where: MonthlyIncomeWhereUniqueInput
  }

  /**
   * MonthlyIncome updateMany
   */
  export type MonthlyIncomeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MonthlyIncomes.
     */
    data: XOR<MonthlyIncomeUpdateManyMutationInput, MonthlyIncomeUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyIncomes to update
     */
    where?: MonthlyIncomeWhereInput
  }

  /**
   * MonthlyIncome upsert
   */
  export type MonthlyIncomeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyIncome
     */
    select?: MonthlyIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyIncomeInclude<ExtArgs> | null
    /**
     * The filter to search for the MonthlyIncome to update in case it exists.
     */
    where: MonthlyIncomeWhereUniqueInput
    /**
     * In case the MonthlyIncome found by the `where` argument doesn't exist, create a new MonthlyIncome with this data.
     */
    create: XOR<MonthlyIncomeCreateInput, MonthlyIncomeUncheckedCreateInput>
    /**
     * In case the MonthlyIncome was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MonthlyIncomeUpdateInput, MonthlyIncomeUncheckedUpdateInput>
  }

  /**
   * MonthlyIncome delete
   */
  export type MonthlyIncomeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyIncome
     */
    select?: MonthlyIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyIncomeInclude<ExtArgs> | null
    /**
     * Filter which MonthlyIncome to delete.
     */
    where: MonthlyIncomeWhereUniqueInput
  }

  /**
   * MonthlyIncome deleteMany
   */
  export type MonthlyIncomeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyIncomes to delete
     */
    where?: MonthlyIncomeWhereInput
  }

  /**
   * MonthlyIncome without action
   */
  export type MonthlyIncomeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyIncome
     */
    select?: MonthlyIncomeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyIncomeInclude<ExtArgs> | null
  }


  /**
   * Model MonthlyCharge
   */

  export type AggregateMonthlyCharge = {
    _count: MonthlyChargeCountAggregateOutputType | null
    _avg: MonthlyChargeAvgAggregateOutputType | null
    _sum: MonthlyChargeSumAggregateOutputType | null
    _min: MonthlyChargeMinAggregateOutputType | null
    _max: MonthlyChargeMaxAggregateOutputType | null
  }

  export type MonthlyChargeAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type MonthlyChargeSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type MonthlyChargeMinAggregateOutputType = {
    id: string | null
    name: string | null
    amount: Decimal | null
    monthlyBudgetId: string | null
    createdAt: Date | null
  }

  export type MonthlyChargeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    amount: Decimal | null
    monthlyBudgetId: string | null
    createdAt: Date | null
  }

  export type MonthlyChargeCountAggregateOutputType = {
    id: number
    name: number
    amount: number
    monthlyBudgetId: number
    createdAt: number
    _all: number
  }


  export type MonthlyChargeAvgAggregateInputType = {
    amount?: true
  }

  export type MonthlyChargeSumAggregateInputType = {
    amount?: true
  }

  export type MonthlyChargeMinAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    monthlyBudgetId?: true
    createdAt?: true
  }

  export type MonthlyChargeMaxAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    monthlyBudgetId?: true
    createdAt?: true
  }

  export type MonthlyChargeCountAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    monthlyBudgetId?: true
    createdAt?: true
    _all?: true
  }

  export type MonthlyChargeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyCharge to aggregate.
     */
    where?: MonthlyChargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyCharges to fetch.
     */
    orderBy?: MonthlyChargeOrderByWithRelationInput | MonthlyChargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MonthlyChargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyCharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyCharges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MonthlyCharges
    **/
    _count?: true | MonthlyChargeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MonthlyChargeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MonthlyChargeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MonthlyChargeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MonthlyChargeMaxAggregateInputType
  }

  export type GetMonthlyChargeAggregateType<T extends MonthlyChargeAggregateArgs> = {
        [P in keyof T & keyof AggregateMonthlyCharge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMonthlyCharge[P]>
      : GetScalarType<T[P], AggregateMonthlyCharge[P]>
  }




  export type MonthlyChargeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyChargeWhereInput
    orderBy?: MonthlyChargeOrderByWithAggregationInput | MonthlyChargeOrderByWithAggregationInput[]
    by: MonthlyChargeScalarFieldEnum[] | MonthlyChargeScalarFieldEnum
    having?: MonthlyChargeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MonthlyChargeCountAggregateInputType | true
    _avg?: MonthlyChargeAvgAggregateInputType
    _sum?: MonthlyChargeSumAggregateInputType
    _min?: MonthlyChargeMinAggregateInputType
    _max?: MonthlyChargeMaxAggregateInputType
  }

  export type MonthlyChargeGroupByOutputType = {
    id: string
    name: string
    amount: Decimal
    monthlyBudgetId: string
    createdAt: Date
    _count: MonthlyChargeCountAggregateOutputType | null
    _avg: MonthlyChargeAvgAggregateOutputType | null
    _sum: MonthlyChargeSumAggregateOutputType | null
    _min: MonthlyChargeMinAggregateOutputType | null
    _max: MonthlyChargeMaxAggregateOutputType | null
  }

  type GetMonthlyChargeGroupByPayload<T extends MonthlyChargeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MonthlyChargeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MonthlyChargeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MonthlyChargeGroupByOutputType[P]>
            : GetScalarType<T[P], MonthlyChargeGroupByOutputType[P]>
        }
      >
    >


  export type MonthlyChargeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    amount?: boolean
    monthlyBudgetId?: boolean
    createdAt?: boolean
    monthlyBudget?: boolean | MonthlyBudgetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyCharge"]>

  export type MonthlyChargeSelectScalar = {
    id?: boolean
    name?: boolean
    amount?: boolean
    monthlyBudgetId?: boolean
    createdAt?: boolean
  }


  export type MonthlyChargeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    monthlyBudget?: boolean | MonthlyBudgetDefaultArgs<ExtArgs>
  }


  export type $MonthlyChargePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MonthlyCharge"
    objects: {
      monthlyBudget: Prisma.$MonthlyBudgetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      amount: Prisma.Decimal
      monthlyBudgetId: string
      createdAt: Date
    }, ExtArgs["result"]["monthlyCharge"]>
    composites: {}
  }


  type MonthlyChargeGetPayload<S extends boolean | null | undefined | MonthlyChargeDefaultArgs> = $Result.GetResult<Prisma.$MonthlyChargePayload, S>

  type MonthlyChargeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MonthlyChargeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MonthlyChargeCountAggregateInputType | true
    }

  export interface MonthlyChargeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MonthlyCharge'], meta: { name: 'MonthlyCharge' } }
    /**
     * Find zero or one MonthlyCharge that matches the filter.
     * @param {MonthlyChargeFindUniqueArgs} args - Arguments to find a MonthlyCharge
     * @example
     * // Get one MonthlyCharge
     * const monthlyCharge = await prisma.monthlyCharge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MonthlyChargeFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyChargeFindUniqueArgs<ExtArgs>>
    ): Prisma__MonthlyChargeClient<$Result.GetResult<Prisma.$MonthlyChargePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one MonthlyCharge that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MonthlyChargeFindUniqueOrThrowArgs} args - Arguments to find a MonthlyCharge
     * @example
     * // Get one MonthlyCharge
     * const monthlyCharge = await prisma.monthlyCharge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MonthlyChargeFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyChargeFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__MonthlyChargeClient<$Result.GetResult<Prisma.$MonthlyChargePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first MonthlyCharge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyChargeFindFirstArgs} args - Arguments to find a MonthlyCharge
     * @example
     * // Get one MonthlyCharge
     * const monthlyCharge = await prisma.monthlyCharge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MonthlyChargeFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyChargeFindFirstArgs<ExtArgs>>
    ): Prisma__MonthlyChargeClient<$Result.GetResult<Prisma.$MonthlyChargePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first MonthlyCharge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyChargeFindFirstOrThrowArgs} args - Arguments to find a MonthlyCharge
     * @example
     * // Get one MonthlyCharge
     * const monthlyCharge = await prisma.monthlyCharge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MonthlyChargeFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyChargeFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__MonthlyChargeClient<$Result.GetResult<Prisma.$MonthlyChargePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more MonthlyCharges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyChargeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MonthlyCharges
     * const monthlyCharges = await prisma.monthlyCharge.findMany()
     * 
     * // Get first 10 MonthlyCharges
     * const monthlyCharges = await prisma.monthlyCharge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const monthlyChargeWithIdOnly = await prisma.monthlyCharge.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MonthlyChargeFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyChargeFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyChargePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a MonthlyCharge.
     * @param {MonthlyChargeCreateArgs} args - Arguments to create a MonthlyCharge.
     * @example
     * // Create one MonthlyCharge
     * const MonthlyCharge = await prisma.monthlyCharge.create({
     *   data: {
     *     // ... data to create a MonthlyCharge
     *   }
     * })
     * 
    **/
    create<T extends MonthlyChargeCreateArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyChargeCreateArgs<ExtArgs>>
    ): Prisma__MonthlyChargeClient<$Result.GetResult<Prisma.$MonthlyChargePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many MonthlyCharges.
     * @param {MonthlyChargeCreateManyArgs} args - Arguments to create many MonthlyCharges.
     * @example
     * // Create many MonthlyCharges
     * const monthlyCharge = await prisma.monthlyCharge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends MonthlyChargeCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyChargeCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MonthlyCharges and returns the data saved in the database.
     * @param {MonthlyChargeCreateManyAndReturnArgs} args - Arguments to create many MonthlyCharges.
     * @example
     * // Create many MonthlyCharges
     * const monthlyCharge = await prisma.monthlyCharge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MonthlyCharges and only return the `id`
     * const monthlyChargeWithIdOnly = await prisma.monthlyCharge.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends MonthlyChargeCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyChargeCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyChargePayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a MonthlyCharge.
     * @param {MonthlyChargeDeleteArgs} args - Arguments to delete one MonthlyCharge.
     * @example
     * // Delete one MonthlyCharge
     * const MonthlyCharge = await prisma.monthlyCharge.delete({
     *   where: {
     *     // ... filter to delete one MonthlyCharge
     *   }
     * })
     * 
    **/
    delete<T extends MonthlyChargeDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyChargeDeleteArgs<ExtArgs>>
    ): Prisma__MonthlyChargeClient<$Result.GetResult<Prisma.$MonthlyChargePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one MonthlyCharge.
     * @param {MonthlyChargeUpdateArgs} args - Arguments to update one MonthlyCharge.
     * @example
     * // Update one MonthlyCharge
     * const monthlyCharge = await prisma.monthlyCharge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MonthlyChargeUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyChargeUpdateArgs<ExtArgs>>
    ): Prisma__MonthlyChargeClient<$Result.GetResult<Prisma.$MonthlyChargePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more MonthlyCharges.
     * @param {MonthlyChargeDeleteManyArgs} args - Arguments to filter MonthlyCharges to delete.
     * @example
     * // Delete a few MonthlyCharges
     * const { count } = await prisma.monthlyCharge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MonthlyChargeDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MonthlyChargeDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyCharges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyChargeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MonthlyCharges
     * const monthlyCharge = await prisma.monthlyCharge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MonthlyChargeUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyChargeUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MonthlyCharge.
     * @param {MonthlyChargeUpsertArgs} args - Arguments to update or create a MonthlyCharge.
     * @example
     * // Update or create a MonthlyCharge
     * const monthlyCharge = await prisma.monthlyCharge.upsert({
     *   create: {
     *     // ... data to create a MonthlyCharge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MonthlyCharge we want to update
     *   }
     * })
    **/
    upsert<T extends MonthlyChargeUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, MonthlyChargeUpsertArgs<ExtArgs>>
    ): Prisma__MonthlyChargeClient<$Result.GetResult<Prisma.$MonthlyChargePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of MonthlyCharges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyChargeCountArgs} args - Arguments to filter MonthlyCharges to count.
     * @example
     * // Count the number of MonthlyCharges
     * const count = await prisma.monthlyCharge.count({
     *   where: {
     *     // ... the filter for the MonthlyCharges we want to count
     *   }
     * })
    **/
    count<T extends MonthlyChargeCountArgs>(
      args?: Subset<T, MonthlyChargeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MonthlyChargeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MonthlyCharge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyChargeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MonthlyChargeAggregateArgs>(args: Subset<T, MonthlyChargeAggregateArgs>): Prisma.PrismaPromise<GetMonthlyChargeAggregateType<T>>

    /**
     * Group by MonthlyCharge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyChargeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MonthlyChargeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MonthlyChargeGroupByArgs['orderBy'] }
        : { orderBy?: MonthlyChargeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MonthlyChargeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMonthlyChargeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MonthlyCharge model
   */
  readonly fields: MonthlyChargeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MonthlyCharge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MonthlyChargeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    monthlyBudget<T extends MonthlyBudgetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MonthlyBudgetDefaultArgs<ExtArgs>>): Prisma__MonthlyBudgetClient<$Result.GetResult<Prisma.$MonthlyBudgetPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the MonthlyCharge model
   */ 
  interface MonthlyChargeFieldRefs {
    readonly id: FieldRef<"MonthlyCharge", 'String'>
    readonly name: FieldRef<"MonthlyCharge", 'String'>
    readonly amount: FieldRef<"MonthlyCharge", 'Decimal'>
    readonly monthlyBudgetId: FieldRef<"MonthlyCharge", 'String'>
    readonly createdAt: FieldRef<"MonthlyCharge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MonthlyCharge findUnique
   */
  export type MonthlyChargeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyCharge
     */
    select?: MonthlyChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyChargeInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyCharge to fetch.
     */
    where: MonthlyChargeWhereUniqueInput
  }

  /**
   * MonthlyCharge findUniqueOrThrow
   */
  export type MonthlyChargeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyCharge
     */
    select?: MonthlyChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyChargeInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyCharge to fetch.
     */
    where: MonthlyChargeWhereUniqueInput
  }

  /**
   * MonthlyCharge findFirst
   */
  export type MonthlyChargeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyCharge
     */
    select?: MonthlyChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyChargeInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyCharge to fetch.
     */
    where?: MonthlyChargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyCharges to fetch.
     */
    orderBy?: MonthlyChargeOrderByWithRelationInput | MonthlyChargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyCharges.
     */
    cursor?: MonthlyChargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyCharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyCharges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyCharges.
     */
    distinct?: MonthlyChargeScalarFieldEnum | MonthlyChargeScalarFieldEnum[]
  }

  /**
   * MonthlyCharge findFirstOrThrow
   */
  export type MonthlyChargeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyCharge
     */
    select?: MonthlyChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyChargeInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyCharge to fetch.
     */
    where?: MonthlyChargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyCharges to fetch.
     */
    orderBy?: MonthlyChargeOrderByWithRelationInput | MonthlyChargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyCharges.
     */
    cursor?: MonthlyChargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyCharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyCharges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyCharges.
     */
    distinct?: MonthlyChargeScalarFieldEnum | MonthlyChargeScalarFieldEnum[]
  }

  /**
   * MonthlyCharge findMany
   */
  export type MonthlyChargeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyCharge
     */
    select?: MonthlyChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyChargeInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyCharges to fetch.
     */
    where?: MonthlyChargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyCharges to fetch.
     */
    orderBy?: MonthlyChargeOrderByWithRelationInput | MonthlyChargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MonthlyCharges.
     */
    cursor?: MonthlyChargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyCharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyCharges.
     */
    skip?: number
    distinct?: MonthlyChargeScalarFieldEnum | MonthlyChargeScalarFieldEnum[]
  }

  /**
   * MonthlyCharge create
   */
  export type MonthlyChargeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyCharge
     */
    select?: MonthlyChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyChargeInclude<ExtArgs> | null
    /**
     * The data needed to create a MonthlyCharge.
     */
    data: XOR<MonthlyChargeCreateInput, MonthlyChargeUncheckedCreateInput>
  }

  /**
   * MonthlyCharge createMany
   */
  export type MonthlyChargeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MonthlyCharges.
     */
    data: MonthlyChargeCreateManyInput | MonthlyChargeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MonthlyCharge createManyAndReturn
   */
  export type MonthlyChargeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyCharge
     */
    select?: MonthlyChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyChargeInclude<ExtArgs> | null
    /**
     * The data used to create many MonthlyCharges.
     */
    data: MonthlyChargeCreateManyInput | MonthlyChargeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MonthlyCharge update
   */
  export type MonthlyChargeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyCharge
     */
    select?: MonthlyChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyChargeInclude<ExtArgs> | null
    /**
     * The data needed to update a MonthlyCharge.
     */
    data: XOR<MonthlyChargeUpdateInput, MonthlyChargeUncheckedUpdateInput>
    /**
     * Choose, which MonthlyCharge to update.
     */
    where: MonthlyChargeWhereUniqueInput
  }

  /**
   * MonthlyCharge updateMany
   */
  export type MonthlyChargeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MonthlyCharges.
     */
    data: XOR<MonthlyChargeUpdateManyMutationInput, MonthlyChargeUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyCharges to update
     */
    where?: MonthlyChargeWhereInput
  }

  /**
   * MonthlyCharge upsert
   */
  export type MonthlyChargeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyCharge
     */
    select?: MonthlyChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyChargeInclude<ExtArgs> | null
    /**
     * The filter to search for the MonthlyCharge to update in case it exists.
     */
    where: MonthlyChargeWhereUniqueInput
    /**
     * In case the MonthlyCharge found by the `where` argument doesn't exist, create a new MonthlyCharge with this data.
     */
    create: XOR<MonthlyChargeCreateInput, MonthlyChargeUncheckedCreateInput>
    /**
     * In case the MonthlyCharge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MonthlyChargeUpdateInput, MonthlyChargeUncheckedUpdateInput>
  }

  /**
   * MonthlyCharge delete
   */
  export type MonthlyChargeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyCharge
     */
    select?: MonthlyChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyChargeInclude<ExtArgs> | null
    /**
     * Filter which MonthlyCharge to delete.
     */
    where: MonthlyChargeWhereUniqueInput
  }

  /**
   * MonthlyCharge deleteMany
   */
  export type MonthlyChargeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyCharges to delete
     */
    where?: MonthlyChargeWhereInput
  }

  /**
   * MonthlyCharge without action
   */
  export type MonthlyChargeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyCharge
     */
    select?: MonthlyChargeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyChargeInclude<ExtArgs> | null
  }


  /**
   * Model WeeklyExpense
   */

  export type AggregateWeeklyExpense = {
    _count: WeeklyExpenseCountAggregateOutputType | null
    _avg: WeeklyExpenseAvgAggregateOutputType | null
    _sum: WeeklyExpenseSumAggregateOutputType | null
    _min: WeeklyExpenseMinAggregateOutputType | null
    _max: WeeklyExpenseMaxAggregateOutputType | null
  }

  export type WeeklyExpenseAvgAggregateOutputType = {
    amount: Decimal | null
    weekNumber: number | null
  }

  export type WeeklyExpenseSumAggregateOutputType = {
    amount: Decimal | null
    weekNumber: number | null
  }

  export type WeeklyExpenseMinAggregateOutputType = {
    id: string | null
    name: string | null
    amount: Decimal | null
    weekNumber: number | null
    category: string | null
    monthlyBudgetId: string | null
    createdAt: Date | null
  }

  export type WeeklyExpenseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    amount: Decimal | null
    weekNumber: number | null
    category: string | null
    monthlyBudgetId: string | null
    createdAt: Date | null
  }

  export type WeeklyExpenseCountAggregateOutputType = {
    id: number
    name: number
    amount: number
    weekNumber: number
    category: number
    monthlyBudgetId: number
    createdAt: number
    _all: number
  }


  export type WeeklyExpenseAvgAggregateInputType = {
    amount?: true
    weekNumber?: true
  }

  export type WeeklyExpenseSumAggregateInputType = {
    amount?: true
    weekNumber?: true
  }

  export type WeeklyExpenseMinAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    weekNumber?: true
    category?: true
    monthlyBudgetId?: true
    createdAt?: true
  }

  export type WeeklyExpenseMaxAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    weekNumber?: true
    category?: true
    monthlyBudgetId?: true
    createdAt?: true
  }

  export type WeeklyExpenseCountAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    weekNumber?: true
    category?: true
    monthlyBudgetId?: true
    createdAt?: true
    _all?: true
  }

  export type WeeklyExpenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeeklyExpense to aggregate.
     */
    where?: WeeklyExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyExpenses to fetch.
     */
    orderBy?: WeeklyExpenseOrderByWithRelationInput | WeeklyExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeeklyExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyExpenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyExpenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeeklyExpenses
    **/
    _count?: true | WeeklyExpenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WeeklyExpenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WeeklyExpenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeeklyExpenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeeklyExpenseMaxAggregateInputType
  }

  export type GetWeeklyExpenseAggregateType<T extends WeeklyExpenseAggregateArgs> = {
        [P in keyof T & keyof AggregateWeeklyExpense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeeklyExpense[P]>
      : GetScalarType<T[P], AggregateWeeklyExpense[P]>
  }




  export type WeeklyExpenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeeklyExpenseWhereInput
    orderBy?: WeeklyExpenseOrderByWithAggregationInput | WeeklyExpenseOrderByWithAggregationInput[]
    by: WeeklyExpenseScalarFieldEnum[] | WeeklyExpenseScalarFieldEnum
    having?: WeeklyExpenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeeklyExpenseCountAggregateInputType | true
    _avg?: WeeklyExpenseAvgAggregateInputType
    _sum?: WeeklyExpenseSumAggregateInputType
    _min?: WeeklyExpenseMinAggregateInputType
    _max?: WeeklyExpenseMaxAggregateInputType
  }

  export type WeeklyExpenseGroupByOutputType = {
    id: string
    name: string
    amount: Decimal
    weekNumber: number
    category: string | null
    monthlyBudgetId: string
    createdAt: Date
    _count: WeeklyExpenseCountAggregateOutputType | null
    _avg: WeeklyExpenseAvgAggregateOutputType | null
    _sum: WeeklyExpenseSumAggregateOutputType | null
    _min: WeeklyExpenseMinAggregateOutputType | null
    _max: WeeklyExpenseMaxAggregateOutputType | null
  }

  type GetWeeklyExpenseGroupByPayload<T extends WeeklyExpenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeeklyExpenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeeklyExpenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeeklyExpenseGroupByOutputType[P]>
            : GetScalarType<T[P], WeeklyExpenseGroupByOutputType[P]>
        }
      >
    >


  export type WeeklyExpenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    amount?: boolean
    weekNumber?: boolean
    category?: boolean
    monthlyBudgetId?: boolean
    createdAt?: boolean
    monthlyBudget?: boolean | MonthlyBudgetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklyExpense"]>

  export type WeeklyExpenseSelectScalar = {
    id?: boolean
    name?: boolean
    amount?: boolean
    weekNumber?: boolean
    category?: boolean
    monthlyBudgetId?: boolean
    createdAt?: boolean
  }


  export type WeeklyExpenseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    monthlyBudget?: boolean | MonthlyBudgetDefaultArgs<ExtArgs>
  }


  export type $WeeklyExpensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeeklyExpense"
    objects: {
      monthlyBudget: Prisma.$MonthlyBudgetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      amount: Prisma.Decimal
      weekNumber: number
      category: string | null
      monthlyBudgetId: string
      createdAt: Date
    }, ExtArgs["result"]["weeklyExpense"]>
    composites: {}
  }


  type WeeklyExpenseGetPayload<S extends boolean | null | undefined | WeeklyExpenseDefaultArgs> = $Result.GetResult<Prisma.$WeeklyExpensePayload, S>

  type WeeklyExpenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WeeklyExpenseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WeeklyExpenseCountAggregateInputType | true
    }

  export interface WeeklyExpenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeeklyExpense'], meta: { name: 'WeeklyExpense' } }
    /**
     * Find zero or one WeeklyExpense that matches the filter.
     * @param {WeeklyExpenseFindUniqueArgs} args - Arguments to find a WeeklyExpense
     * @example
     * // Get one WeeklyExpense
     * const weeklyExpense = await prisma.weeklyExpense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WeeklyExpenseFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, WeeklyExpenseFindUniqueArgs<ExtArgs>>
    ): Prisma__WeeklyExpenseClient<$Result.GetResult<Prisma.$WeeklyExpensePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one WeeklyExpense that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WeeklyExpenseFindUniqueOrThrowArgs} args - Arguments to find a WeeklyExpense
     * @example
     * // Get one WeeklyExpense
     * const weeklyExpense = await prisma.weeklyExpense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WeeklyExpenseFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WeeklyExpenseFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__WeeklyExpenseClient<$Result.GetResult<Prisma.$WeeklyExpensePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first WeeklyExpense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyExpenseFindFirstArgs} args - Arguments to find a WeeklyExpense
     * @example
     * // Get one WeeklyExpense
     * const weeklyExpense = await prisma.weeklyExpense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WeeklyExpenseFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, WeeklyExpenseFindFirstArgs<ExtArgs>>
    ): Prisma__WeeklyExpenseClient<$Result.GetResult<Prisma.$WeeklyExpensePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first WeeklyExpense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyExpenseFindFirstOrThrowArgs} args - Arguments to find a WeeklyExpense
     * @example
     * // Get one WeeklyExpense
     * const weeklyExpense = await prisma.weeklyExpense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WeeklyExpenseFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WeeklyExpenseFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__WeeklyExpenseClient<$Result.GetResult<Prisma.$WeeklyExpensePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more WeeklyExpenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyExpenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeeklyExpenses
     * const weeklyExpenses = await prisma.weeklyExpense.findMany()
     * 
     * // Get first 10 WeeklyExpenses
     * const weeklyExpenses = await prisma.weeklyExpense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weeklyExpenseWithIdOnly = await prisma.weeklyExpense.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WeeklyExpenseFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WeeklyExpenseFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyExpensePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a WeeklyExpense.
     * @param {WeeklyExpenseCreateArgs} args - Arguments to create a WeeklyExpense.
     * @example
     * // Create one WeeklyExpense
     * const WeeklyExpense = await prisma.weeklyExpense.create({
     *   data: {
     *     // ... data to create a WeeklyExpense
     *   }
     * })
     * 
    **/
    create<T extends WeeklyExpenseCreateArgs<ExtArgs>>(
      args: SelectSubset<T, WeeklyExpenseCreateArgs<ExtArgs>>
    ): Prisma__WeeklyExpenseClient<$Result.GetResult<Prisma.$WeeklyExpensePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many WeeklyExpenses.
     * @param {WeeklyExpenseCreateManyArgs} args - Arguments to create many WeeklyExpenses.
     * @example
     * // Create many WeeklyExpenses
     * const weeklyExpense = await prisma.weeklyExpense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends WeeklyExpenseCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WeeklyExpenseCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeeklyExpenses and returns the data saved in the database.
     * @param {WeeklyExpenseCreateManyAndReturnArgs} args - Arguments to create many WeeklyExpenses.
     * @example
     * // Create many WeeklyExpenses
     * const weeklyExpense = await prisma.weeklyExpense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeeklyExpenses and only return the `id`
     * const weeklyExpenseWithIdOnly = await prisma.weeklyExpense.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends WeeklyExpenseCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, WeeklyExpenseCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyExpensePayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a WeeklyExpense.
     * @param {WeeklyExpenseDeleteArgs} args - Arguments to delete one WeeklyExpense.
     * @example
     * // Delete one WeeklyExpense
     * const WeeklyExpense = await prisma.weeklyExpense.delete({
     *   where: {
     *     // ... filter to delete one WeeklyExpense
     *   }
     * })
     * 
    **/
    delete<T extends WeeklyExpenseDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, WeeklyExpenseDeleteArgs<ExtArgs>>
    ): Prisma__WeeklyExpenseClient<$Result.GetResult<Prisma.$WeeklyExpensePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one WeeklyExpense.
     * @param {WeeklyExpenseUpdateArgs} args - Arguments to update one WeeklyExpense.
     * @example
     * // Update one WeeklyExpense
     * const weeklyExpense = await prisma.weeklyExpense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WeeklyExpenseUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, WeeklyExpenseUpdateArgs<ExtArgs>>
    ): Prisma__WeeklyExpenseClient<$Result.GetResult<Prisma.$WeeklyExpensePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more WeeklyExpenses.
     * @param {WeeklyExpenseDeleteManyArgs} args - Arguments to filter WeeklyExpenses to delete.
     * @example
     * // Delete a few WeeklyExpenses
     * const { count } = await prisma.weeklyExpense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WeeklyExpenseDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WeeklyExpenseDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeeklyExpenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyExpenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeeklyExpenses
     * const weeklyExpense = await prisma.weeklyExpense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WeeklyExpenseUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, WeeklyExpenseUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WeeklyExpense.
     * @param {WeeklyExpenseUpsertArgs} args - Arguments to update or create a WeeklyExpense.
     * @example
     * // Update or create a WeeklyExpense
     * const weeklyExpense = await prisma.weeklyExpense.upsert({
     *   create: {
     *     // ... data to create a WeeklyExpense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeeklyExpense we want to update
     *   }
     * })
    **/
    upsert<T extends WeeklyExpenseUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, WeeklyExpenseUpsertArgs<ExtArgs>>
    ): Prisma__WeeklyExpenseClient<$Result.GetResult<Prisma.$WeeklyExpensePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of WeeklyExpenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyExpenseCountArgs} args - Arguments to filter WeeklyExpenses to count.
     * @example
     * // Count the number of WeeklyExpenses
     * const count = await prisma.weeklyExpense.count({
     *   where: {
     *     // ... the filter for the WeeklyExpenses we want to count
     *   }
     * })
    **/
    count<T extends WeeklyExpenseCountArgs>(
      args?: Subset<T, WeeklyExpenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeeklyExpenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeeklyExpense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyExpenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WeeklyExpenseAggregateArgs>(args: Subset<T, WeeklyExpenseAggregateArgs>): Prisma.PrismaPromise<GetWeeklyExpenseAggregateType<T>>

    /**
     * Group by WeeklyExpense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyExpenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WeeklyExpenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeeklyExpenseGroupByArgs['orderBy'] }
        : { orderBy?: WeeklyExpenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WeeklyExpenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeeklyExpenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeeklyExpense model
   */
  readonly fields: WeeklyExpenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeeklyExpense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeeklyExpenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    monthlyBudget<T extends MonthlyBudgetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MonthlyBudgetDefaultArgs<ExtArgs>>): Prisma__MonthlyBudgetClient<$Result.GetResult<Prisma.$MonthlyBudgetPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the WeeklyExpense model
   */ 
  interface WeeklyExpenseFieldRefs {
    readonly id: FieldRef<"WeeklyExpense", 'String'>
    readonly name: FieldRef<"WeeklyExpense", 'String'>
    readonly amount: FieldRef<"WeeklyExpense", 'Decimal'>
    readonly weekNumber: FieldRef<"WeeklyExpense", 'Int'>
    readonly category: FieldRef<"WeeklyExpense", 'String'>
    readonly monthlyBudgetId: FieldRef<"WeeklyExpense", 'String'>
    readonly createdAt: FieldRef<"WeeklyExpense", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WeeklyExpense findUnique
   */
  export type WeeklyExpenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyExpense
     */
    select?: WeeklyExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyExpenseInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyExpense to fetch.
     */
    where: WeeklyExpenseWhereUniqueInput
  }

  /**
   * WeeklyExpense findUniqueOrThrow
   */
  export type WeeklyExpenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyExpense
     */
    select?: WeeklyExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyExpenseInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyExpense to fetch.
     */
    where: WeeklyExpenseWhereUniqueInput
  }

  /**
   * WeeklyExpense findFirst
   */
  export type WeeklyExpenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyExpense
     */
    select?: WeeklyExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyExpenseInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyExpense to fetch.
     */
    where?: WeeklyExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyExpenses to fetch.
     */
    orderBy?: WeeklyExpenseOrderByWithRelationInput | WeeklyExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeeklyExpenses.
     */
    cursor?: WeeklyExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyExpenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyExpenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeeklyExpenses.
     */
    distinct?: WeeklyExpenseScalarFieldEnum | WeeklyExpenseScalarFieldEnum[]
  }

  /**
   * WeeklyExpense findFirstOrThrow
   */
  export type WeeklyExpenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyExpense
     */
    select?: WeeklyExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyExpenseInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyExpense to fetch.
     */
    where?: WeeklyExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyExpenses to fetch.
     */
    orderBy?: WeeklyExpenseOrderByWithRelationInput | WeeklyExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeeklyExpenses.
     */
    cursor?: WeeklyExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyExpenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyExpenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeeklyExpenses.
     */
    distinct?: WeeklyExpenseScalarFieldEnum | WeeklyExpenseScalarFieldEnum[]
  }

  /**
   * WeeklyExpense findMany
   */
  export type WeeklyExpenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyExpense
     */
    select?: WeeklyExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyExpenseInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyExpenses to fetch.
     */
    where?: WeeklyExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyExpenses to fetch.
     */
    orderBy?: WeeklyExpenseOrderByWithRelationInput | WeeklyExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeeklyExpenses.
     */
    cursor?: WeeklyExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyExpenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyExpenses.
     */
    skip?: number
    distinct?: WeeklyExpenseScalarFieldEnum | WeeklyExpenseScalarFieldEnum[]
  }

  /**
   * WeeklyExpense create
   */
  export type WeeklyExpenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyExpense
     */
    select?: WeeklyExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyExpenseInclude<ExtArgs> | null
    /**
     * The data needed to create a WeeklyExpense.
     */
    data: XOR<WeeklyExpenseCreateInput, WeeklyExpenseUncheckedCreateInput>
  }

  /**
   * WeeklyExpense createMany
   */
  export type WeeklyExpenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeeklyExpenses.
     */
    data: WeeklyExpenseCreateManyInput | WeeklyExpenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeeklyExpense createManyAndReturn
   */
  export type WeeklyExpenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyExpense
     */
    select?: WeeklyExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyExpenseInclude<ExtArgs> | null
    /**
     * The data used to create many WeeklyExpenses.
     */
    data: WeeklyExpenseCreateManyInput | WeeklyExpenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeeklyExpense update
   */
  export type WeeklyExpenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyExpense
     */
    select?: WeeklyExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyExpenseInclude<ExtArgs> | null
    /**
     * The data needed to update a WeeklyExpense.
     */
    data: XOR<WeeklyExpenseUpdateInput, WeeklyExpenseUncheckedUpdateInput>
    /**
     * Choose, which WeeklyExpense to update.
     */
    where: WeeklyExpenseWhereUniqueInput
  }

  /**
   * WeeklyExpense updateMany
   */
  export type WeeklyExpenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeeklyExpenses.
     */
    data: XOR<WeeklyExpenseUpdateManyMutationInput, WeeklyExpenseUncheckedUpdateManyInput>
    /**
     * Filter which WeeklyExpenses to update
     */
    where?: WeeklyExpenseWhereInput
  }

  /**
   * WeeklyExpense upsert
   */
  export type WeeklyExpenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyExpense
     */
    select?: WeeklyExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyExpenseInclude<ExtArgs> | null
    /**
     * The filter to search for the WeeklyExpense to update in case it exists.
     */
    where: WeeklyExpenseWhereUniqueInput
    /**
     * In case the WeeklyExpense found by the `where` argument doesn't exist, create a new WeeklyExpense with this data.
     */
    create: XOR<WeeklyExpenseCreateInput, WeeklyExpenseUncheckedCreateInput>
    /**
     * In case the WeeklyExpense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeeklyExpenseUpdateInput, WeeklyExpenseUncheckedUpdateInput>
  }

  /**
   * WeeklyExpense delete
   */
  export type WeeklyExpenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyExpense
     */
    select?: WeeklyExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyExpenseInclude<ExtArgs> | null
    /**
     * Filter which WeeklyExpense to delete.
     */
    where: WeeklyExpenseWhereUniqueInput
  }

  /**
   * WeeklyExpense deleteMany
   */
  export type WeeklyExpenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeeklyExpenses to delete
     */
    where?: WeeklyExpenseWhereInput
  }

  /**
   * WeeklyExpense without action
   */
  export type WeeklyExpenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyExpense
     */
    select?: WeeklyExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyExpenseInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const FixedIncomeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    amount: 'amount',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type FixedIncomeScalarFieldEnum = (typeof FixedIncomeScalarFieldEnum)[keyof typeof FixedIncomeScalarFieldEnum]


  export const FixedChargeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    amount: 'amount',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type FixedChargeScalarFieldEnum = (typeof FixedChargeScalarFieldEnum)[keyof typeof FixedChargeScalarFieldEnum]


  export const MonthlyBudgetScalarFieldEnum: {
    id: 'id',
    month: 'month',
    year: 'year',
    isCurrent: 'isCurrent',
    remainingBudget: 'remainingBudget',
    weeklyBudget: 'weeklyBudget',
    numberOfWeeks: 'numberOfWeeks',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type MonthlyBudgetScalarFieldEnum = (typeof MonthlyBudgetScalarFieldEnum)[keyof typeof MonthlyBudgetScalarFieldEnum]


  export const MonthlyIncomeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    amount: 'amount',
    monthlyBudgetId: 'monthlyBudgetId',
    createdAt: 'createdAt'
  };

  export type MonthlyIncomeScalarFieldEnum = (typeof MonthlyIncomeScalarFieldEnum)[keyof typeof MonthlyIncomeScalarFieldEnum]


  export const MonthlyChargeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    amount: 'amount',
    monthlyBudgetId: 'monthlyBudgetId',
    createdAt: 'createdAt'
  };

  export type MonthlyChargeScalarFieldEnum = (typeof MonthlyChargeScalarFieldEnum)[keyof typeof MonthlyChargeScalarFieldEnum]


  export const WeeklyExpenseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    amount: 'amount',
    weekNumber: 'weekNumber',
    category: 'category',
    monthlyBudgetId: 'monthlyBudgetId',
    createdAt: 'createdAt'
  };

  export type WeeklyExpenseScalarFieldEnum = (typeof WeeklyExpenseScalarFieldEnum)[keyof typeof WeeklyExpenseScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    fixedIncomes?: FixedIncomeListRelationFilter
    fixedCharges?: FixedChargeListRelationFilter
    monthlyBudgets?: MonthlyBudgetListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    fixedIncomes?: FixedIncomeOrderByRelationAggregateInput
    fixedCharges?: FixedChargeOrderByRelationAggregateInput
    monthlyBudgets?: MonthlyBudgetOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    fixedIncomes?: FixedIncomeListRelationFilter
    fixedCharges?: FixedChargeListRelationFilter
    monthlyBudgets?: MonthlyBudgetListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type FixedIncomeWhereInput = {
    AND?: FixedIncomeWhereInput | FixedIncomeWhereInput[]
    OR?: FixedIncomeWhereInput[]
    NOT?: FixedIncomeWhereInput | FixedIncomeWhereInput[]
    id?: StringFilter<"FixedIncome"> | string
    name?: StringFilter<"FixedIncome"> | string
    amount?: DecimalFilter<"FixedIncome"> | Decimal | DecimalJsLike | number | string
    userId?: StringFilter<"FixedIncome"> | string
    createdAt?: DateTimeFilter<"FixedIncome"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type FixedIncomeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FixedIncomeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FixedIncomeWhereInput | FixedIncomeWhereInput[]
    OR?: FixedIncomeWhereInput[]
    NOT?: FixedIncomeWhereInput | FixedIncomeWhereInput[]
    name?: StringFilter<"FixedIncome"> | string
    amount?: DecimalFilter<"FixedIncome"> | Decimal | DecimalJsLike | number | string
    userId?: StringFilter<"FixedIncome"> | string
    createdAt?: DateTimeFilter<"FixedIncome"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type FixedIncomeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: FixedIncomeCountOrderByAggregateInput
    _avg?: FixedIncomeAvgOrderByAggregateInput
    _max?: FixedIncomeMaxOrderByAggregateInput
    _min?: FixedIncomeMinOrderByAggregateInput
    _sum?: FixedIncomeSumOrderByAggregateInput
  }

  export type FixedIncomeScalarWhereWithAggregatesInput = {
    AND?: FixedIncomeScalarWhereWithAggregatesInput | FixedIncomeScalarWhereWithAggregatesInput[]
    OR?: FixedIncomeScalarWhereWithAggregatesInput[]
    NOT?: FixedIncomeScalarWhereWithAggregatesInput | FixedIncomeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FixedIncome"> | string
    name?: StringWithAggregatesFilter<"FixedIncome"> | string
    amount?: DecimalWithAggregatesFilter<"FixedIncome"> | Decimal | DecimalJsLike | number | string
    userId?: StringWithAggregatesFilter<"FixedIncome"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FixedIncome"> | Date | string
  }

  export type FixedChargeWhereInput = {
    AND?: FixedChargeWhereInput | FixedChargeWhereInput[]
    OR?: FixedChargeWhereInput[]
    NOT?: FixedChargeWhereInput | FixedChargeWhereInput[]
    id?: StringFilter<"FixedCharge"> | string
    name?: StringFilter<"FixedCharge"> | string
    amount?: DecimalFilter<"FixedCharge"> | Decimal | DecimalJsLike | number | string
    userId?: StringFilter<"FixedCharge"> | string
    createdAt?: DateTimeFilter<"FixedCharge"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type FixedChargeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FixedChargeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FixedChargeWhereInput | FixedChargeWhereInput[]
    OR?: FixedChargeWhereInput[]
    NOT?: FixedChargeWhereInput | FixedChargeWhereInput[]
    name?: StringFilter<"FixedCharge"> | string
    amount?: DecimalFilter<"FixedCharge"> | Decimal | DecimalJsLike | number | string
    userId?: StringFilter<"FixedCharge"> | string
    createdAt?: DateTimeFilter<"FixedCharge"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type FixedChargeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: FixedChargeCountOrderByAggregateInput
    _avg?: FixedChargeAvgOrderByAggregateInput
    _max?: FixedChargeMaxOrderByAggregateInput
    _min?: FixedChargeMinOrderByAggregateInput
    _sum?: FixedChargeSumOrderByAggregateInput
  }

  export type FixedChargeScalarWhereWithAggregatesInput = {
    AND?: FixedChargeScalarWhereWithAggregatesInput | FixedChargeScalarWhereWithAggregatesInput[]
    OR?: FixedChargeScalarWhereWithAggregatesInput[]
    NOT?: FixedChargeScalarWhereWithAggregatesInput | FixedChargeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FixedCharge"> | string
    name?: StringWithAggregatesFilter<"FixedCharge"> | string
    amount?: DecimalWithAggregatesFilter<"FixedCharge"> | Decimal | DecimalJsLike | number | string
    userId?: StringWithAggregatesFilter<"FixedCharge"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FixedCharge"> | Date | string
  }

  export type MonthlyBudgetWhereInput = {
    AND?: MonthlyBudgetWhereInput | MonthlyBudgetWhereInput[]
    OR?: MonthlyBudgetWhereInput[]
    NOT?: MonthlyBudgetWhereInput | MonthlyBudgetWhereInput[]
    id?: StringFilter<"MonthlyBudget"> | string
    month?: IntFilter<"MonthlyBudget"> | number
    year?: IntFilter<"MonthlyBudget"> | number
    isCurrent?: BoolFilter<"MonthlyBudget"> | boolean
    remainingBudget?: DecimalFilter<"MonthlyBudget"> | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFilter<"MonthlyBudget"> | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFilter<"MonthlyBudget"> | number
    userId?: StringFilter<"MonthlyBudget"> | string
    createdAt?: DateTimeFilter<"MonthlyBudget"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    incomes?: MonthlyIncomeListRelationFilter
    charges?: MonthlyChargeListRelationFilter
    expenses?: WeeklyExpenseListRelationFilter
  }

  export type MonthlyBudgetOrderByWithRelationInput = {
    id?: SortOrder
    month?: SortOrder
    year?: SortOrder
    isCurrent?: SortOrder
    remainingBudget?: SortOrder
    weeklyBudget?: SortOrder
    numberOfWeeks?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    incomes?: MonthlyIncomeOrderByRelationAggregateInput
    charges?: MonthlyChargeOrderByRelationAggregateInput
    expenses?: WeeklyExpenseOrderByRelationAggregateInput
  }

  export type MonthlyBudgetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_month_year?: MonthlyBudgetUserIdMonthYearCompoundUniqueInput
    AND?: MonthlyBudgetWhereInput | MonthlyBudgetWhereInput[]
    OR?: MonthlyBudgetWhereInput[]
    NOT?: MonthlyBudgetWhereInput | MonthlyBudgetWhereInput[]
    month?: IntFilter<"MonthlyBudget"> | number
    year?: IntFilter<"MonthlyBudget"> | number
    isCurrent?: BoolFilter<"MonthlyBudget"> | boolean
    remainingBudget?: DecimalFilter<"MonthlyBudget"> | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFilter<"MonthlyBudget"> | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFilter<"MonthlyBudget"> | number
    userId?: StringFilter<"MonthlyBudget"> | string
    createdAt?: DateTimeFilter<"MonthlyBudget"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    incomes?: MonthlyIncomeListRelationFilter
    charges?: MonthlyChargeListRelationFilter
    expenses?: WeeklyExpenseListRelationFilter
  }, "id" | "userId_month_year">

  export type MonthlyBudgetOrderByWithAggregationInput = {
    id?: SortOrder
    month?: SortOrder
    year?: SortOrder
    isCurrent?: SortOrder
    remainingBudget?: SortOrder
    weeklyBudget?: SortOrder
    numberOfWeeks?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: MonthlyBudgetCountOrderByAggregateInput
    _avg?: MonthlyBudgetAvgOrderByAggregateInput
    _max?: MonthlyBudgetMaxOrderByAggregateInput
    _min?: MonthlyBudgetMinOrderByAggregateInput
    _sum?: MonthlyBudgetSumOrderByAggregateInput
  }

  export type MonthlyBudgetScalarWhereWithAggregatesInput = {
    AND?: MonthlyBudgetScalarWhereWithAggregatesInput | MonthlyBudgetScalarWhereWithAggregatesInput[]
    OR?: MonthlyBudgetScalarWhereWithAggregatesInput[]
    NOT?: MonthlyBudgetScalarWhereWithAggregatesInput | MonthlyBudgetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MonthlyBudget"> | string
    month?: IntWithAggregatesFilter<"MonthlyBudget"> | number
    year?: IntWithAggregatesFilter<"MonthlyBudget"> | number
    isCurrent?: BoolWithAggregatesFilter<"MonthlyBudget"> | boolean
    remainingBudget?: DecimalWithAggregatesFilter<"MonthlyBudget"> | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalWithAggregatesFilter<"MonthlyBudget"> | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntWithAggregatesFilter<"MonthlyBudget"> | number
    userId?: StringWithAggregatesFilter<"MonthlyBudget"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MonthlyBudget"> | Date | string
  }

  export type MonthlyIncomeWhereInput = {
    AND?: MonthlyIncomeWhereInput | MonthlyIncomeWhereInput[]
    OR?: MonthlyIncomeWhereInput[]
    NOT?: MonthlyIncomeWhereInput | MonthlyIncomeWhereInput[]
    id?: StringFilter<"MonthlyIncome"> | string
    name?: StringFilter<"MonthlyIncome"> | string
    amount?: DecimalFilter<"MonthlyIncome"> | Decimal | DecimalJsLike | number | string
    monthlyBudgetId?: StringFilter<"MonthlyIncome"> | string
    createdAt?: DateTimeFilter<"MonthlyIncome"> | Date | string
    monthlyBudget?: XOR<MonthlyBudgetRelationFilter, MonthlyBudgetWhereInput>
  }

  export type MonthlyIncomeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    monthlyBudgetId?: SortOrder
    createdAt?: SortOrder
    monthlyBudget?: MonthlyBudgetOrderByWithRelationInput
  }

  export type MonthlyIncomeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MonthlyIncomeWhereInput | MonthlyIncomeWhereInput[]
    OR?: MonthlyIncomeWhereInput[]
    NOT?: MonthlyIncomeWhereInput | MonthlyIncomeWhereInput[]
    name?: StringFilter<"MonthlyIncome"> | string
    amount?: DecimalFilter<"MonthlyIncome"> | Decimal | DecimalJsLike | number | string
    monthlyBudgetId?: StringFilter<"MonthlyIncome"> | string
    createdAt?: DateTimeFilter<"MonthlyIncome"> | Date | string
    monthlyBudget?: XOR<MonthlyBudgetRelationFilter, MonthlyBudgetWhereInput>
  }, "id">

  export type MonthlyIncomeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    monthlyBudgetId?: SortOrder
    createdAt?: SortOrder
    _count?: MonthlyIncomeCountOrderByAggregateInput
    _avg?: MonthlyIncomeAvgOrderByAggregateInput
    _max?: MonthlyIncomeMaxOrderByAggregateInput
    _min?: MonthlyIncomeMinOrderByAggregateInput
    _sum?: MonthlyIncomeSumOrderByAggregateInput
  }

  export type MonthlyIncomeScalarWhereWithAggregatesInput = {
    AND?: MonthlyIncomeScalarWhereWithAggregatesInput | MonthlyIncomeScalarWhereWithAggregatesInput[]
    OR?: MonthlyIncomeScalarWhereWithAggregatesInput[]
    NOT?: MonthlyIncomeScalarWhereWithAggregatesInput | MonthlyIncomeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MonthlyIncome"> | string
    name?: StringWithAggregatesFilter<"MonthlyIncome"> | string
    amount?: DecimalWithAggregatesFilter<"MonthlyIncome"> | Decimal | DecimalJsLike | number | string
    monthlyBudgetId?: StringWithAggregatesFilter<"MonthlyIncome"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MonthlyIncome"> | Date | string
  }

  export type MonthlyChargeWhereInput = {
    AND?: MonthlyChargeWhereInput | MonthlyChargeWhereInput[]
    OR?: MonthlyChargeWhereInput[]
    NOT?: MonthlyChargeWhereInput | MonthlyChargeWhereInput[]
    id?: StringFilter<"MonthlyCharge"> | string
    name?: StringFilter<"MonthlyCharge"> | string
    amount?: DecimalFilter<"MonthlyCharge"> | Decimal | DecimalJsLike | number | string
    monthlyBudgetId?: StringFilter<"MonthlyCharge"> | string
    createdAt?: DateTimeFilter<"MonthlyCharge"> | Date | string
    monthlyBudget?: XOR<MonthlyBudgetRelationFilter, MonthlyBudgetWhereInput>
  }

  export type MonthlyChargeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    monthlyBudgetId?: SortOrder
    createdAt?: SortOrder
    monthlyBudget?: MonthlyBudgetOrderByWithRelationInput
  }

  export type MonthlyChargeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MonthlyChargeWhereInput | MonthlyChargeWhereInput[]
    OR?: MonthlyChargeWhereInput[]
    NOT?: MonthlyChargeWhereInput | MonthlyChargeWhereInput[]
    name?: StringFilter<"MonthlyCharge"> | string
    amount?: DecimalFilter<"MonthlyCharge"> | Decimal | DecimalJsLike | number | string
    monthlyBudgetId?: StringFilter<"MonthlyCharge"> | string
    createdAt?: DateTimeFilter<"MonthlyCharge"> | Date | string
    monthlyBudget?: XOR<MonthlyBudgetRelationFilter, MonthlyBudgetWhereInput>
  }, "id">

  export type MonthlyChargeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    monthlyBudgetId?: SortOrder
    createdAt?: SortOrder
    _count?: MonthlyChargeCountOrderByAggregateInput
    _avg?: MonthlyChargeAvgOrderByAggregateInput
    _max?: MonthlyChargeMaxOrderByAggregateInput
    _min?: MonthlyChargeMinOrderByAggregateInput
    _sum?: MonthlyChargeSumOrderByAggregateInput
  }

  export type MonthlyChargeScalarWhereWithAggregatesInput = {
    AND?: MonthlyChargeScalarWhereWithAggregatesInput | MonthlyChargeScalarWhereWithAggregatesInput[]
    OR?: MonthlyChargeScalarWhereWithAggregatesInput[]
    NOT?: MonthlyChargeScalarWhereWithAggregatesInput | MonthlyChargeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MonthlyCharge"> | string
    name?: StringWithAggregatesFilter<"MonthlyCharge"> | string
    amount?: DecimalWithAggregatesFilter<"MonthlyCharge"> | Decimal | DecimalJsLike | number | string
    monthlyBudgetId?: StringWithAggregatesFilter<"MonthlyCharge"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MonthlyCharge"> | Date | string
  }

  export type WeeklyExpenseWhereInput = {
    AND?: WeeklyExpenseWhereInput | WeeklyExpenseWhereInput[]
    OR?: WeeklyExpenseWhereInput[]
    NOT?: WeeklyExpenseWhereInput | WeeklyExpenseWhereInput[]
    id?: StringFilter<"WeeklyExpense"> | string
    name?: StringFilter<"WeeklyExpense"> | string
    amount?: DecimalFilter<"WeeklyExpense"> | Decimal | DecimalJsLike | number | string
    weekNumber?: IntFilter<"WeeklyExpense"> | number
    category?: StringNullableFilter<"WeeklyExpense"> | string | null
    monthlyBudgetId?: StringFilter<"WeeklyExpense"> | string
    createdAt?: DateTimeFilter<"WeeklyExpense"> | Date | string
    monthlyBudget?: XOR<MonthlyBudgetRelationFilter, MonthlyBudgetWhereInput>
  }

  export type WeeklyExpenseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    weekNumber?: SortOrder
    category?: SortOrderInput | SortOrder
    monthlyBudgetId?: SortOrder
    createdAt?: SortOrder
    monthlyBudget?: MonthlyBudgetOrderByWithRelationInput
  }

  export type WeeklyExpenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WeeklyExpenseWhereInput | WeeklyExpenseWhereInput[]
    OR?: WeeklyExpenseWhereInput[]
    NOT?: WeeklyExpenseWhereInput | WeeklyExpenseWhereInput[]
    name?: StringFilter<"WeeklyExpense"> | string
    amount?: DecimalFilter<"WeeklyExpense"> | Decimal | DecimalJsLike | number | string
    weekNumber?: IntFilter<"WeeklyExpense"> | number
    category?: StringNullableFilter<"WeeklyExpense"> | string | null
    monthlyBudgetId?: StringFilter<"WeeklyExpense"> | string
    createdAt?: DateTimeFilter<"WeeklyExpense"> | Date | string
    monthlyBudget?: XOR<MonthlyBudgetRelationFilter, MonthlyBudgetWhereInput>
  }, "id">

  export type WeeklyExpenseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    weekNumber?: SortOrder
    category?: SortOrderInput | SortOrder
    monthlyBudgetId?: SortOrder
    createdAt?: SortOrder
    _count?: WeeklyExpenseCountOrderByAggregateInput
    _avg?: WeeklyExpenseAvgOrderByAggregateInput
    _max?: WeeklyExpenseMaxOrderByAggregateInput
    _min?: WeeklyExpenseMinOrderByAggregateInput
    _sum?: WeeklyExpenseSumOrderByAggregateInput
  }

  export type WeeklyExpenseScalarWhereWithAggregatesInput = {
    AND?: WeeklyExpenseScalarWhereWithAggregatesInput | WeeklyExpenseScalarWhereWithAggregatesInput[]
    OR?: WeeklyExpenseScalarWhereWithAggregatesInput[]
    NOT?: WeeklyExpenseScalarWhereWithAggregatesInput | WeeklyExpenseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WeeklyExpense"> | string
    name?: StringWithAggregatesFilter<"WeeklyExpense"> | string
    amount?: DecimalWithAggregatesFilter<"WeeklyExpense"> | Decimal | DecimalJsLike | number | string
    weekNumber?: IntWithAggregatesFilter<"WeeklyExpense"> | number
    category?: StringNullableWithAggregatesFilter<"WeeklyExpense"> | string | null
    monthlyBudgetId?: StringWithAggregatesFilter<"WeeklyExpense"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WeeklyExpense"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    fixedIncomes?: FixedIncomeCreateNestedManyWithoutUserInput
    fixedCharges?: FixedChargeCreateNestedManyWithoutUserInput
    monthlyBudgets?: MonthlyBudgetCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    fixedIncomes?: FixedIncomeUncheckedCreateNestedManyWithoutUserInput
    fixedCharges?: FixedChargeUncheckedCreateNestedManyWithoutUserInput
    monthlyBudgets?: MonthlyBudgetUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    fixedIncomes?: FixedIncomeUpdateManyWithoutUserNestedInput
    fixedCharges?: FixedChargeUpdateManyWithoutUserNestedInput
    monthlyBudgets?: MonthlyBudgetUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    fixedIncomes?: FixedIncomeUncheckedUpdateManyWithoutUserNestedInput
    fixedCharges?: FixedChargeUncheckedUpdateManyWithoutUserNestedInput
    monthlyBudgets?: MonthlyBudgetUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FixedIncomeCreateInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFixedIncomesInput
  }

  export type FixedIncomeUncheckedCreateInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    userId: string
    createdAt?: Date | string
  }

  export type FixedIncomeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFixedIncomesNestedInput
  }

  export type FixedIncomeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FixedIncomeCreateManyInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    userId: string
    createdAt?: Date | string
  }

  export type FixedIncomeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FixedIncomeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FixedChargeCreateInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFixedChargesInput
  }

  export type FixedChargeUncheckedCreateInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    userId: string
    createdAt?: Date | string
  }

  export type FixedChargeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFixedChargesNestedInput
  }

  export type FixedChargeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FixedChargeCreateManyInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    userId: string
    createdAt?: Date | string
  }

  export type FixedChargeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FixedChargeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyBudgetCreateInput = {
    id?: string
    month: number
    year: number
    isCurrent?: boolean
    remainingBudget: Decimal | DecimalJsLike | number | string
    weeklyBudget: Decimal | DecimalJsLike | number | string
    numberOfWeeks: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMonthlyBudgetsInput
    incomes?: MonthlyIncomeCreateNestedManyWithoutMonthlyBudgetInput
    charges?: MonthlyChargeCreateNestedManyWithoutMonthlyBudgetInput
    expenses?: WeeklyExpenseCreateNestedManyWithoutMonthlyBudgetInput
  }

  export type MonthlyBudgetUncheckedCreateInput = {
    id?: string
    month: number
    year: number
    isCurrent?: boolean
    remainingBudget: Decimal | DecimalJsLike | number | string
    weeklyBudget: Decimal | DecimalJsLike | number | string
    numberOfWeeks: number
    userId: string
    createdAt?: Date | string
    incomes?: MonthlyIncomeUncheckedCreateNestedManyWithoutMonthlyBudgetInput
    charges?: MonthlyChargeUncheckedCreateNestedManyWithoutMonthlyBudgetInput
    expenses?: WeeklyExpenseUncheckedCreateNestedManyWithoutMonthlyBudgetInput
  }

  export type MonthlyBudgetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    remainingBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMonthlyBudgetsNestedInput
    incomes?: MonthlyIncomeUpdateManyWithoutMonthlyBudgetNestedInput
    charges?: MonthlyChargeUpdateManyWithoutMonthlyBudgetNestedInput
    expenses?: WeeklyExpenseUpdateManyWithoutMonthlyBudgetNestedInput
  }

  export type MonthlyBudgetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    remainingBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    incomes?: MonthlyIncomeUncheckedUpdateManyWithoutMonthlyBudgetNestedInput
    charges?: MonthlyChargeUncheckedUpdateManyWithoutMonthlyBudgetNestedInput
    expenses?: WeeklyExpenseUncheckedUpdateManyWithoutMonthlyBudgetNestedInput
  }

  export type MonthlyBudgetCreateManyInput = {
    id?: string
    month: number
    year: number
    isCurrent?: boolean
    remainingBudget: Decimal | DecimalJsLike | number | string
    weeklyBudget: Decimal | DecimalJsLike | number | string
    numberOfWeeks: number
    userId: string
    createdAt?: Date | string
  }

  export type MonthlyBudgetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    remainingBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyBudgetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    remainingBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyIncomeCreateInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    monthlyBudget: MonthlyBudgetCreateNestedOneWithoutIncomesInput
  }

  export type MonthlyIncomeUncheckedCreateInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    monthlyBudgetId: string
    createdAt?: Date | string
  }

  export type MonthlyIncomeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyBudget?: MonthlyBudgetUpdateOneRequiredWithoutIncomesNestedInput
  }

  export type MonthlyIncomeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    monthlyBudgetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyIncomeCreateManyInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    monthlyBudgetId: string
    createdAt?: Date | string
  }

  export type MonthlyIncomeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyIncomeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    monthlyBudgetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyChargeCreateInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    monthlyBudget: MonthlyBudgetCreateNestedOneWithoutChargesInput
  }

  export type MonthlyChargeUncheckedCreateInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    monthlyBudgetId: string
    createdAt?: Date | string
  }

  export type MonthlyChargeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyBudget?: MonthlyBudgetUpdateOneRequiredWithoutChargesNestedInput
  }

  export type MonthlyChargeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    monthlyBudgetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyChargeCreateManyInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    monthlyBudgetId: string
    createdAt?: Date | string
  }

  export type MonthlyChargeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyChargeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    monthlyBudgetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyExpenseCreateInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    weekNumber: number
    category?: string | null
    createdAt?: Date | string
    monthlyBudget: MonthlyBudgetCreateNestedOneWithoutExpensesInput
  }

  export type WeeklyExpenseUncheckedCreateInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    weekNumber: number
    category?: string | null
    monthlyBudgetId: string
    createdAt?: Date | string
  }

  export type WeeklyExpenseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyBudget?: MonthlyBudgetUpdateOneRequiredWithoutExpensesNestedInput
  }

  export type WeeklyExpenseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyBudgetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyExpenseCreateManyInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    weekNumber: number
    category?: string | null
    monthlyBudgetId: string
    createdAt?: Date | string
  }

  export type WeeklyExpenseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyExpenseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyBudgetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type FixedIncomeListRelationFilter = {
    every?: FixedIncomeWhereInput
    some?: FixedIncomeWhereInput
    none?: FixedIncomeWhereInput
  }

  export type FixedChargeListRelationFilter = {
    every?: FixedChargeWhereInput
    some?: FixedChargeWhereInput
    none?: FixedChargeWhereInput
  }

  export type MonthlyBudgetListRelationFilter = {
    every?: MonthlyBudgetWhereInput
    some?: MonthlyBudgetWhereInput
    none?: MonthlyBudgetWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FixedIncomeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FixedChargeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MonthlyBudgetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type FixedIncomeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type FixedIncomeAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type FixedIncomeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type FixedIncomeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type FixedIncomeSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type FixedChargeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type FixedChargeAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type FixedChargeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type FixedChargeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type FixedChargeSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type MonthlyIncomeListRelationFilter = {
    every?: MonthlyIncomeWhereInput
    some?: MonthlyIncomeWhereInput
    none?: MonthlyIncomeWhereInput
  }

  export type MonthlyChargeListRelationFilter = {
    every?: MonthlyChargeWhereInput
    some?: MonthlyChargeWhereInput
    none?: MonthlyChargeWhereInput
  }

  export type WeeklyExpenseListRelationFilter = {
    every?: WeeklyExpenseWhereInput
    some?: WeeklyExpenseWhereInput
    none?: WeeklyExpenseWhereInput
  }

  export type MonthlyIncomeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MonthlyChargeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WeeklyExpenseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MonthlyBudgetUserIdMonthYearCompoundUniqueInput = {
    userId: string
    month: number
    year: number
  }

  export type MonthlyBudgetCountOrderByAggregateInput = {
    id?: SortOrder
    month?: SortOrder
    year?: SortOrder
    isCurrent?: SortOrder
    remainingBudget?: SortOrder
    weeklyBudget?: SortOrder
    numberOfWeeks?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type MonthlyBudgetAvgOrderByAggregateInput = {
    month?: SortOrder
    year?: SortOrder
    remainingBudget?: SortOrder
    weeklyBudget?: SortOrder
    numberOfWeeks?: SortOrder
  }

  export type MonthlyBudgetMaxOrderByAggregateInput = {
    id?: SortOrder
    month?: SortOrder
    year?: SortOrder
    isCurrent?: SortOrder
    remainingBudget?: SortOrder
    weeklyBudget?: SortOrder
    numberOfWeeks?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type MonthlyBudgetMinOrderByAggregateInput = {
    id?: SortOrder
    month?: SortOrder
    year?: SortOrder
    isCurrent?: SortOrder
    remainingBudget?: SortOrder
    weeklyBudget?: SortOrder
    numberOfWeeks?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type MonthlyBudgetSumOrderByAggregateInput = {
    month?: SortOrder
    year?: SortOrder
    remainingBudget?: SortOrder
    weeklyBudget?: SortOrder
    numberOfWeeks?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type MonthlyBudgetRelationFilter = {
    is?: MonthlyBudgetWhereInput
    isNot?: MonthlyBudgetWhereInput
  }

  export type MonthlyIncomeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    monthlyBudgetId?: SortOrder
    createdAt?: SortOrder
  }

  export type MonthlyIncomeAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type MonthlyIncomeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    monthlyBudgetId?: SortOrder
    createdAt?: SortOrder
  }

  export type MonthlyIncomeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    monthlyBudgetId?: SortOrder
    createdAt?: SortOrder
  }

  export type MonthlyIncomeSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type MonthlyChargeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    monthlyBudgetId?: SortOrder
    createdAt?: SortOrder
  }

  export type MonthlyChargeAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type MonthlyChargeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    monthlyBudgetId?: SortOrder
    createdAt?: SortOrder
  }

  export type MonthlyChargeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    monthlyBudgetId?: SortOrder
    createdAt?: SortOrder
  }

  export type MonthlyChargeSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WeeklyExpenseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    weekNumber?: SortOrder
    category?: SortOrder
    monthlyBudgetId?: SortOrder
    createdAt?: SortOrder
  }

  export type WeeklyExpenseAvgOrderByAggregateInput = {
    amount?: SortOrder
    weekNumber?: SortOrder
  }

  export type WeeklyExpenseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    weekNumber?: SortOrder
    category?: SortOrder
    monthlyBudgetId?: SortOrder
    createdAt?: SortOrder
  }

  export type WeeklyExpenseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    weekNumber?: SortOrder
    category?: SortOrder
    monthlyBudgetId?: SortOrder
    createdAt?: SortOrder
  }

  export type WeeklyExpenseSumOrderByAggregateInput = {
    amount?: SortOrder
    weekNumber?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type FixedIncomeCreateNestedManyWithoutUserInput = {
    create?: XOR<FixedIncomeCreateWithoutUserInput, FixedIncomeUncheckedCreateWithoutUserInput> | FixedIncomeCreateWithoutUserInput[] | FixedIncomeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FixedIncomeCreateOrConnectWithoutUserInput | FixedIncomeCreateOrConnectWithoutUserInput[]
    createMany?: FixedIncomeCreateManyUserInputEnvelope
    connect?: FixedIncomeWhereUniqueInput | FixedIncomeWhereUniqueInput[]
  }

  export type FixedChargeCreateNestedManyWithoutUserInput = {
    create?: XOR<FixedChargeCreateWithoutUserInput, FixedChargeUncheckedCreateWithoutUserInput> | FixedChargeCreateWithoutUserInput[] | FixedChargeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FixedChargeCreateOrConnectWithoutUserInput | FixedChargeCreateOrConnectWithoutUserInput[]
    createMany?: FixedChargeCreateManyUserInputEnvelope
    connect?: FixedChargeWhereUniqueInput | FixedChargeWhereUniqueInput[]
  }

  export type MonthlyBudgetCreateNestedManyWithoutUserInput = {
    create?: XOR<MonthlyBudgetCreateWithoutUserInput, MonthlyBudgetUncheckedCreateWithoutUserInput> | MonthlyBudgetCreateWithoutUserInput[] | MonthlyBudgetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlyBudgetCreateOrConnectWithoutUserInput | MonthlyBudgetCreateOrConnectWithoutUserInput[]
    createMany?: MonthlyBudgetCreateManyUserInputEnvelope
    connect?: MonthlyBudgetWhereUniqueInput | MonthlyBudgetWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type FixedIncomeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FixedIncomeCreateWithoutUserInput, FixedIncomeUncheckedCreateWithoutUserInput> | FixedIncomeCreateWithoutUserInput[] | FixedIncomeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FixedIncomeCreateOrConnectWithoutUserInput | FixedIncomeCreateOrConnectWithoutUserInput[]
    createMany?: FixedIncomeCreateManyUserInputEnvelope
    connect?: FixedIncomeWhereUniqueInput | FixedIncomeWhereUniqueInput[]
  }

  export type FixedChargeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FixedChargeCreateWithoutUserInput, FixedChargeUncheckedCreateWithoutUserInput> | FixedChargeCreateWithoutUserInput[] | FixedChargeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FixedChargeCreateOrConnectWithoutUserInput | FixedChargeCreateOrConnectWithoutUserInput[]
    createMany?: FixedChargeCreateManyUserInputEnvelope
    connect?: FixedChargeWhereUniqueInput | FixedChargeWhereUniqueInput[]
  }

  export type MonthlyBudgetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MonthlyBudgetCreateWithoutUserInput, MonthlyBudgetUncheckedCreateWithoutUserInput> | MonthlyBudgetCreateWithoutUserInput[] | MonthlyBudgetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlyBudgetCreateOrConnectWithoutUserInput | MonthlyBudgetCreateOrConnectWithoutUserInput[]
    createMany?: MonthlyBudgetCreateManyUserInputEnvelope
    connect?: MonthlyBudgetWhereUniqueInput | MonthlyBudgetWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type FixedIncomeUpdateManyWithoutUserNestedInput = {
    create?: XOR<FixedIncomeCreateWithoutUserInput, FixedIncomeUncheckedCreateWithoutUserInput> | FixedIncomeCreateWithoutUserInput[] | FixedIncomeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FixedIncomeCreateOrConnectWithoutUserInput | FixedIncomeCreateOrConnectWithoutUserInput[]
    upsert?: FixedIncomeUpsertWithWhereUniqueWithoutUserInput | FixedIncomeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FixedIncomeCreateManyUserInputEnvelope
    set?: FixedIncomeWhereUniqueInput | FixedIncomeWhereUniqueInput[]
    disconnect?: FixedIncomeWhereUniqueInput | FixedIncomeWhereUniqueInput[]
    delete?: FixedIncomeWhereUniqueInput | FixedIncomeWhereUniqueInput[]
    connect?: FixedIncomeWhereUniqueInput | FixedIncomeWhereUniqueInput[]
    update?: FixedIncomeUpdateWithWhereUniqueWithoutUserInput | FixedIncomeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FixedIncomeUpdateManyWithWhereWithoutUserInput | FixedIncomeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FixedIncomeScalarWhereInput | FixedIncomeScalarWhereInput[]
  }

  export type FixedChargeUpdateManyWithoutUserNestedInput = {
    create?: XOR<FixedChargeCreateWithoutUserInput, FixedChargeUncheckedCreateWithoutUserInput> | FixedChargeCreateWithoutUserInput[] | FixedChargeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FixedChargeCreateOrConnectWithoutUserInput | FixedChargeCreateOrConnectWithoutUserInput[]
    upsert?: FixedChargeUpsertWithWhereUniqueWithoutUserInput | FixedChargeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FixedChargeCreateManyUserInputEnvelope
    set?: FixedChargeWhereUniqueInput | FixedChargeWhereUniqueInput[]
    disconnect?: FixedChargeWhereUniqueInput | FixedChargeWhereUniqueInput[]
    delete?: FixedChargeWhereUniqueInput | FixedChargeWhereUniqueInput[]
    connect?: FixedChargeWhereUniqueInput | FixedChargeWhereUniqueInput[]
    update?: FixedChargeUpdateWithWhereUniqueWithoutUserInput | FixedChargeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FixedChargeUpdateManyWithWhereWithoutUserInput | FixedChargeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FixedChargeScalarWhereInput | FixedChargeScalarWhereInput[]
  }

  export type MonthlyBudgetUpdateManyWithoutUserNestedInput = {
    create?: XOR<MonthlyBudgetCreateWithoutUserInput, MonthlyBudgetUncheckedCreateWithoutUserInput> | MonthlyBudgetCreateWithoutUserInput[] | MonthlyBudgetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlyBudgetCreateOrConnectWithoutUserInput | MonthlyBudgetCreateOrConnectWithoutUserInput[]
    upsert?: MonthlyBudgetUpsertWithWhereUniqueWithoutUserInput | MonthlyBudgetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MonthlyBudgetCreateManyUserInputEnvelope
    set?: MonthlyBudgetWhereUniqueInput | MonthlyBudgetWhereUniqueInput[]
    disconnect?: MonthlyBudgetWhereUniqueInput | MonthlyBudgetWhereUniqueInput[]
    delete?: MonthlyBudgetWhereUniqueInput | MonthlyBudgetWhereUniqueInput[]
    connect?: MonthlyBudgetWhereUniqueInput | MonthlyBudgetWhereUniqueInput[]
    update?: MonthlyBudgetUpdateWithWhereUniqueWithoutUserInput | MonthlyBudgetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MonthlyBudgetUpdateManyWithWhereWithoutUserInput | MonthlyBudgetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MonthlyBudgetScalarWhereInput | MonthlyBudgetScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type FixedIncomeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FixedIncomeCreateWithoutUserInput, FixedIncomeUncheckedCreateWithoutUserInput> | FixedIncomeCreateWithoutUserInput[] | FixedIncomeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FixedIncomeCreateOrConnectWithoutUserInput | FixedIncomeCreateOrConnectWithoutUserInput[]
    upsert?: FixedIncomeUpsertWithWhereUniqueWithoutUserInput | FixedIncomeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FixedIncomeCreateManyUserInputEnvelope
    set?: FixedIncomeWhereUniqueInput | FixedIncomeWhereUniqueInput[]
    disconnect?: FixedIncomeWhereUniqueInput | FixedIncomeWhereUniqueInput[]
    delete?: FixedIncomeWhereUniqueInput | FixedIncomeWhereUniqueInput[]
    connect?: FixedIncomeWhereUniqueInput | FixedIncomeWhereUniqueInput[]
    update?: FixedIncomeUpdateWithWhereUniqueWithoutUserInput | FixedIncomeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FixedIncomeUpdateManyWithWhereWithoutUserInput | FixedIncomeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FixedIncomeScalarWhereInput | FixedIncomeScalarWhereInput[]
  }

  export type FixedChargeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FixedChargeCreateWithoutUserInput, FixedChargeUncheckedCreateWithoutUserInput> | FixedChargeCreateWithoutUserInput[] | FixedChargeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FixedChargeCreateOrConnectWithoutUserInput | FixedChargeCreateOrConnectWithoutUserInput[]
    upsert?: FixedChargeUpsertWithWhereUniqueWithoutUserInput | FixedChargeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FixedChargeCreateManyUserInputEnvelope
    set?: FixedChargeWhereUniqueInput | FixedChargeWhereUniqueInput[]
    disconnect?: FixedChargeWhereUniqueInput | FixedChargeWhereUniqueInput[]
    delete?: FixedChargeWhereUniqueInput | FixedChargeWhereUniqueInput[]
    connect?: FixedChargeWhereUniqueInput | FixedChargeWhereUniqueInput[]
    update?: FixedChargeUpdateWithWhereUniqueWithoutUserInput | FixedChargeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FixedChargeUpdateManyWithWhereWithoutUserInput | FixedChargeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FixedChargeScalarWhereInput | FixedChargeScalarWhereInput[]
  }

  export type MonthlyBudgetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MonthlyBudgetCreateWithoutUserInput, MonthlyBudgetUncheckedCreateWithoutUserInput> | MonthlyBudgetCreateWithoutUserInput[] | MonthlyBudgetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlyBudgetCreateOrConnectWithoutUserInput | MonthlyBudgetCreateOrConnectWithoutUserInput[]
    upsert?: MonthlyBudgetUpsertWithWhereUniqueWithoutUserInput | MonthlyBudgetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MonthlyBudgetCreateManyUserInputEnvelope
    set?: MonthlyBudgetWhereUniqueInput | MonthlyBudgetWhereUniqueInput[]
    disconnect?: MonthlyBudgetWhereUniqueInput | MonthlyBudgetWhereUniqueInput[]
    delete?: MonthlyBudgetWhereUniqueInput | MonthlyBudgetWhereUniqueInput[]
    connect?: MonthlyBudgetWhereUniqueInput | MonthlyBudgetWhereUniqueInput[]
    update?: MonthlyBudgetUpdateWithWhereUniqueWithoutUserInput | MonthlyBudgetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MonthlyBudgetUpdateManyWithWhereWithoutUserInput | MonthlyBudgetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MonthlyBudgetScalarWhereInput | MonthlyBudgetScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutFixedIncomesInput = {
    create?: XOR<UserCreateWithoutFixedIncomesInput, UserUncheckedCreateWithoutFixedIncomesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFixedIncomesInput
    connect?: UserWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutFixedIncomesNestedInput = {
    create?: XOR<UserCreateWithoutFixedIncomesInput, UserUncheckedCreateWithoutFixedIncomesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFixedIncomesInput
    upsert?: UserUpsertWithoutFixedIncomesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFixedIncomesInput, UserUpdateWithoutFixedIncomesInput>, UserUncheckedUpdateWithoutFixedIncomesInput>
  }

  export type UserCreateNestedOneWithoutFixedChargesInput = {
    create?: XOR<UserCreateWithoutFixedChargesInput, UserUncheckedCreateWithoutFixedChargesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFixedChargesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFixedChargesNestedInput = {
    create?: XOR<UserCreateWithoutFixedChargesInput, UserUncheckedCreateWithoutFixedChargesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFixedChargesInput
    upsert?: UserUpsertWithoutFixedChargesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFixedChargesInput, UserUpdateWithoutFixedChargesInput>, UserUncheckedUpdateWithoutFixedChargesInput>
  }

  export type UserCreateNestedOneWithoutMonthlyBudgetsInput = {
    create?: XOR<UserCreateWithoutMonthlyBudgetsInput, UserUncheckedCreateWithoutMonthlyBudgetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMonthlyBudgetsInput
    connect?: UserWhereUniqueInput
  }

  export type MonthlyIncomeCreateNestedManyWithoutMonthlyBudgetInput = {
    create?: XOR<MonthlyIncomeCreateWithoutMonthlyBudgetInput, MonthlyIncomeUncheckedCreateWithoutMonthlyBudgetInput> | MonthlyIncomeCreateWithoutMonthlyBudgetInput[] | MonthlyIncomeUncheckedCreateWithoutMonthlyBudgetInput[]
    connectOrCreate?: MonthlyIncomeCreateOrConnectWithoutMonthlyBudgetInput | MonthlyIncomeCreateOrConnectWithoutMonthlyBudgetInput[]
    createMany?: MonthlyIncomeCreateManyMonthlyBudgetInputEnvelope
    connect?: MonthlyIncomeWhereUniqueInput | MonthlyIncomeWhereUniqueInput[]
  }

  export type MonthlyChargeCreateNestedManyWithoutMonthlyBudgetInput = {
    create?: XOR<MonthlyChargeCreateWithoutMonthlyBudgetInput, MonthlyChargeUncheckedCreateWithoutMonthlyBudgetInput> | MonthlyChargeCreateWithoutMonthlyBudgetInput[] | MonthlyChargeUncheckedCreateWithoutMonthlyBudgetInput[]
    connectOrCreate?: MonthlyChargeCreateOrConnectWithoutMonthlyBudgetInput | MonthlyChargeCreateOrConnectWithoutMonthlyBudgetInput[]
    createMany?: MonthlyChargeCreateManyMonthlyBudgetInputEnvelope
    connect?: MonthlyChargeWhereUniqueInput | MonthlyChargeWhereUniqueInput[]
  }

  export type WeeklyExpenseCreateNestedManyWithoutMonthlyBudgetInput = {
    create?: XOR<WeeklyExpenseCreateWithoutMonthlyBudgetInput, WeeklyExpenseUncheckedCreateWithoutMonthlyBudgetInput> | WeeklyExpenseCreateWithoutMonthlyBudgetInput[] | WeeklyExpenseUncheckedCreateWithoutMonthlyBudgetInput[]
    connectOrCreate?: WeeklyExpenseCreateOrConnectWithoutMonthlyBudgetInput | WeeklyExpenseCreateOrConnectWithoutMonthlyBudgetInput[]
    createMany?: WeeklyExpenseCreateManyMonthlyBudgetInputEnvelope
    connect?: WeeklyExpenseWhereUniqueInput | WeeklyExpenseWhereUniqueInput[]
  }

  export type MonthlyIncomeUncheckedCreateNestedManyWithoutMonthlyBudgetInput = {
    create?: XOR<MonthlyIncomeCreateWithoutMonthlyBudgetInput, MonthlyIncomeUncheckedCreateWithoutMonthlyBudgetInput> | MonthlyIncomeCreateWithoutMonthlyBudgetInput[] | MonthlyIncomeUncheckedCreateWithoutMonthlyBudgetInput[]
    connectOrCreate?: MonthlyIncomeCreateOrConnectWithoutMonthlyBudgetInput | MonthlyIncomeCreateOrConnectWithoutMonthlyBudgetInput[]
    createMany?: MonthlyIncomeCreateManyMonthlyBudgetInputEnvelope
    connect?: MonthlyIncomeWhereUniqueInput | MonthlyIncomeWhereUniqueInput[]
  }

  export type MonthlyChargeUncheckedCreateNestedManyWithoutMonthlyBudgetInput = {
    create?: XOR<MonthlyChargeCreateWithoutMonthlyBudgetInput, MonthlyChargeUncheckedCreateWithoutMonthlyBudgetInput> | MonthlyChargeCreateWithoutMonthlyBudgetInput[] | MonthlyChargeUncheckedCreateWithoutMonthlyBudgetInput[]
    connectOrCreate?: MonthlyChargeCreateOrConnectWithoutMonthlyBudgetInput | MonthlyChargeCreateOrConnectWithoutMonthlyBudgetInput[]
    createMany?: MonthlyChargeCreateManyMonthlyBudgetInputEnvelope
    connect?: MonthlyChargeWhereUniqueInput | MonthlyChargeWhereUniqueInput[]
  }

  export type WeeklyExpenseUncheckedCreateNestedManyWithoutMonthlyBudgetInput = {
    create?: XOR<WeeklyExpenseCreateWithoutMonthlyBudgetInput, WeeklyExpenseUncheckedCreateWithoutMonthlyBudgetInput> | WeeklyExpenseCreateWithoutMonthlyBudgetInput[] | WeeklyExpenseUncheckedCreateWithoutMonthlyBudgetInput[]
    connectOrCreate?: WeeklyExpenseCreateOrConnectWithoutMonthlyBudgetInput | WeeklyExpenseCreateOrConnectWithoutMonthlyBudgetInput[]
    createMany?: WeeklyExpenseCreateManyMonthlyBudgetInputEnvelope
    connect?: WeeklyExpenseWhereUniqueInput | WeeklyExpenseWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutMonthlyBudgetsNestedInput = {
    create?: XOR<UserCreateWithoutMonthlyBudgetsInput, UserUncheckedCreateWithoutMonthlyBudgetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMonthlyBudgetsInput
    upsert?: UserUpsertWithoutMonthlyBudgetsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMonthlyBudgetsInput, UserUpdateWithoutMonthlyBudgetsInput>, UserUncheckedUpdateWithoutMonthlyBudgetsInput>
  }

  export type MonthlyIncomeUpdateManyWithoutMonthlyBudgetNestedInput = {
    create?: XOR<MonthlyIncomeCreateWithoutMonthlyBudgetInput, MonthlyIncomeUncheckedCreateWithoutMonthlyBudgetInput> | MonthlyIncomeCreateWithoutMonthlyBudgetInput[] | MonthlyIncomeUncheckedCreateWithoutMonthlyBudgetInput[]
    connectOrCreate?: MonthlyIncomeCreateOrConnectWithoutMonthlyBudgetInput | MonthlyIncomeCreateOrConnectWithoutMonthlyBudgetInput[]
    upsert?: MonthlyIncomeUpsertWithWhereUniqueWithoutMonthlyBudgetInput | MonthlyIncomeUpsertWithWhereUniqueWithoutMonthlyBudgetInput[]
    createMany?: MonthlyIncomeCreateManyMonthlyBudgetInputEnvelope
    set?: MonthlyIncomeWhereUniqueInput | MonthlyIncomeWhereUniqueInput[]
    disconnect?: MonthlyIncomeWhereUniqueInput | MonthlyIncomeWhereUniqueInput[]
    delete?: MonthlyIncomeWhereUniqueInput | MonthlyIncomeWhereUniqueInput[]
    connect?: MonthlyIncomeWhereUniqueInput | MonthlyIncomeWhereUniqueInput[]
    update?: MonthlyIncomeUpdateWithWhereUniqueWithoutMonthlyBudgetInput | MonthlyIncomeUpdateWithWhereUniqueWithoutMonthlyBudgetInput[]
    updateMany?: MonthlyIncomeUpdateManyWithWhereWithoutMonthlyBudgetInput | MonthlyIncomeUpdateManyWithWhereWithoutMonthlyBudgetInput[]
    deleteMany?: MonthlyIncomeScalarWhereInput | MonthlyIncomeScalarWhereInput[]
  }

  export type MonthlyChargeUpdateManyWithoutMonthlyBudgetNestedInput = {
    create?: XOR<MonthlyChargeCreateWithoutMonthlyBudgetInput, MonthlyChargeUncheckedCreateWithoutMonthlyBudgetInput> | MonthlyChargeCreateWithoutMonthlyBudgetInput[] | MonthlyChargeUncheckedCreateWithoutMonthlyBudgetInput[]
    connectOrCreate?: MonthlyChargeCreateOrConnectWithoutMonthlyBudgetInput | MonthlyChargeCreateOrConnectWithoutMonthlyBudgetInput[]
    upsert?: MonthlyChargeUpsertWithWhereUniqueWithoutMonthlyBudgetInput | MonthlyChargeUpsertWithWhereUniqueWithoutMonthlyBudgetInput[]
    createMany?: MonthlyChargeCreateManyMonthlyBudgetInputEnvelope
    set?: MonthlyChargeWhereUniqueInput | MonthlyChargeWhereUniqueInput[]
    disconnect?: MonthlyChargeWhereUniqueInput | MonthlyChargeWhereUniqueInput[]
    delete?: MonthlyChargeWhereUniqueInput | MonthlyChargeWhereUniqueInput[]
    connect?: MonthlyChargeWhereUniqueInput | MonthlyChargeWhereUniqueInput[]
    update?: MonthlyChargeUpdateWithWhereUniqueWithoutMonthlyBudgetInput | MonthlyChargeUpdateWithWhereUniqueWithoutMonthlyBudgetInput[]
    updateMany?: MonthlyChargeUpdateManyWithWhereWithoutMonthlyBudgetInput | MonthlyChargeUpdateManyWithWhereWithoutMonthlyBudgetInput[]
    deleteMany?: MonthlyChargeScalarWhereInput | MonthlyChargeScalarWhereInput[]
  }

  export type WeeklyExpenseUpdateManyWithoutMonthlyBudgetNestedInput = {
    create?: XOR<WeeklyExpenseCreateWithoutMonthlyBudgetInput, WeeklyExpenseUncheckedCreateWithoutMonthlyBudgetInput> | WeeklyExpenseCreateWithoutMonthlyBudgetInput[] | WeeklyExpenseUncheckedCreateWithoutMonthlyBudgetInput[]
    connectOrCreate?: WeeklyExpenseCreateOrConnectWithoutMonthlyBudgetInput | WeeklyExpenseCreateOrConnectWithoutMonthlyBudgetInput[]
    upsert?: WeeklyExpenseUpsertWithWhereUniqueWithoutMonthlyBudgetInput | WeeklyExpenseUpsertWithWhereUniqueWithoutMonthlyBudgetInput[]
    createMany?: WeeklyExpenseCreateManyMonthlyBudgetInputEnvelope
    set?: WeeklyExpenseWhereUniqueInput | WeeklyExpenseWhereUniqueInput[]
    disconnect?: WeeklyExpenseWhereUniqueInput | WeeklyExpenseWhereUniqueInput[]
    delete?: WeeklyExpenseWhereUniqueInput | WeeklyExpenseWhereUniqueInput[]
    connect?: WeeklyExpenseWhereUniqueInput | WeeklyExpenseWhereUniqueInput[]
    update?: WeeklyExpenseUpdateWithWhereUniqueWithoutMonthlyBudgetInput | WeeklyExpenseUpdateWithWhereUniqueWithoutMonthlyBudgetInput[]
    updateMany?: WeeklyExpenseUpdateManyWithWhereWithoutMonthlyBudgetInput | WeeklyExpenseUpdateManyWithWhereWithoutMonthlyBudgetInput[]
    deleteMany?: WeeklyExpenseScalarWhereInput | WeeklyExpenseScalarWhereInput[]
  }

  export type MonthlyIncomeUncheckedUpdateManyWithoutMonthlyBudgetNestedInput = {
    create?: XOR<MonthlyIncomeCreateWithoutMonthlyBudgetInput, MonthlyIncomeUncheckedCreateWithoutMonthlyBudgetInput> | MonthlyIncomeCreateWithoutMonthlyBudgetInput[] | MonthlyIncomeUncheckedCreateWithoutMonthlyBudgetInput[]
    connectOrCreate?: MonthlyIncomeCreateOrConnectWithoutMonthlyBudgetInput | MonthlyIncomeCreateOrConnectWithoutMonthlyBudgetInput[]
    upsert?: MonthlyIncomeUpsertWithWhereUniqueWithoutMonthlyBudgetInput | MonthlyIncomeUpsertWithWhereUniqueWithoutMonthlyBudgetInput[]
    createMany?: MonthlyIncomeCreateManyMonthlyBudgetInputEnvelope
    set?: MonthlyIncomeWhereUniqueInput | MonthlyIncomeWhereUniqueInput[]
    disconnect?: MonthlyIncomeWhereUniqueInput | MonthlyIncomeWhereUniqueInput[]
    delete?: MonthlyIncomeWhereUniqueInput | MonthlyIncomeWhereUniqueInput[]
    connect?: MonthlyIncomeWhereUniqueInput | MonthlyIncomeWhereUniqueInput[]
    update?: MonthlyIncomeUpdateWithWhereUniqueWithoutMonthlyBudgetInput | MonthlyIncomeUpdateWithWhereUniqueWithoutMonthlyBudgetInput[]
    updateMany?: MonthlyIncomeUpdateManyWithWhereWithoutMonthlyBudgetInput | MonthlyIncomeUpdateManyWithWhereWithoutMonthlyBudgetInput[]
    deleteMany?: MonthlyIncomeScalarWhereInput | MonthlyIncomeScalarWhereInput[]
  }

  export type MonthlyChargeUncheckedUpdateManyWithoutMonthlyBudgetNestedInput = {
    create?: XOR<MonthlyChargeCreateWithoutMonthlyBudgetInput, MonthlyChargeUncheckedCreateWithoutMonthlyBudgetInput> | MonthlyChargeCreateWithoutMonthlyBudgetInput[] | MonthlyChargeUncheckedCreateWithoutMonthlyBudgetInput[]
    connectOrCreate?: MonthlyChargeCreateOrConnectWithoutMonthlyBudgetInput | MonthlyChargeCreateOrConnectWithoutMonthlyBudgetInput[]
    upsert?: MonthlyChargeUpsertWithWhereUniqueWithoutMonthlyBudgetInput | MonthlyChargeUpsertWithWhereUniqueWithoutMonthlyBudgetInput[]
    createMany?: MonthlyChargeCreateManyMonthlyBudgetInputEnvelope
    set?: MonthlyChargeWhereUniqueInput | MonthlyChargeWhereUniqueInput[]
    disconnect?: MonthlyChargeWhereUniqueInput | MonthlyChargeWhereUniqueInput[]
    delete?: MonthlyChargeWhereUniqueInput | MonthlyChargeWhereUniqueInput[]
    connect?: MonthlyChargeWhereUniqueInput | MonthlyChargeWhereUniqueInput[]
    update?: MonthlyChargeUpdateWithWhereUniqueWithoutMonthlyBudgetInput | MonthlyChargeUpdateWithWhereUniqueWithoutMonthlyBudgetInput[]
    updateMany?: MonthlyChargeUpdateManyWithWhereWithoutMonthlyBudgetInput | MonthlyChargeUpdateManyWithWhereWithoutMonthlyBudgetInput[]
    deleteMany?: MonthlyChargeScalarWhereInput | MonthlyChargeScalarWhereInput[]
  }

  export type WeeklyExpenseUncheckedUpdateManyWithoutMonthlyBudgetNestedInput = {
    create?: XOR<WeeklyExpenseCreateWithoutMonthlyBudgetInput, WeeklyExpenseUncheckedCreateWithoutMonthlyBudgetInput> | WeeklyExpenseCreateWithoutMonthlyBudgetInput[] | WeeklyExpenseUncheckedCreateWithoutMonthlyBudgetInput[]
    connectOrCreate?: WeeklyExpenseCreateOrConnectWithoutMonthlyBudgetInput | WeeklyExpenseCreateOrConnectWithoutMonthlyBudgetInput[]
    upsert?: WeeklyExpenseUpsertWithWhereUniqueWithoutMonthlyBudgetInput | WeeklyExpenseUpsertWithWhereUniqueWithoutMonthlyBudgetInput[]
    createMany?: WeeklyExpenseCreateManyMonthlyBudgetInputEnvelope
    set?: WeeklyExpenseWhereUniqueInput | WeeklyExpenseWhereUniqueInput[]
    disconnect?: WeeklyExpenseWhereUniqueInput | WeeklyExpenseWhereUniqueInput[]
    delete?: WeeklyExpenseWhereUniqueInput | WeeklyExpenseWhereUniqueInput[]
    connect?: WeeklyExpenseWhereUniqueInput | WeeklyExpenseWhereUniqueInput[]
    update?: WeeklyExpenseUpdateWithWhereUniqueWithoutMonthlyBudgetInput | WeeklyExpenseUpdateWithWhereUniqueWithoutMonthlyBudgetInput[]
    updateMany?: WeeklyExpenseUpdateManyWithWhereWithoutMonthlyBudgetInput | WeeklyExpenseUpdateManyWithWhereWithoutMonthlyBudgetInput[]
    deleteMany?: WeeklyExpenseScalarWhereInput | WeeklyExpenseScalarWhereInput[]
  }

  export type MonthlyBudgetCreateNestedOneWithoutIncomesInput = {
    create?: XOR<MonthlyBudgetCreateWithoutIncomesInput, MonthlyBudgetUncheckedCreateWithoutIncomesInput>
    connectOrCreate?: MonthlyBudgetCreateOrConnectWithoutIncomesInput
    connect?: MonthlyBudgetWhereUniqueInput
  }

  export type MonthlyBudgetUpdateOneRequiredWithoutIncomesNestedInput = {
    create?: XOR<MonthlyBudgetCreateWithoutIncomesInput, MonthlyBudgetUncheckedCreateWithoutIncomesInput>
    connectOrCreate?: MonthlyBudgetCreateOrConnectWithoutIncomesInput
    upsert?: MonthlyBudgetUpsertWithoutIncomesInput
    connect?: MonthlyBudgetWhereUniqueInput
    update?: XOR<XOR<MonthlyBudgetUpdateToOneWithWhereWithoutIncomesInput, MonthlyBudgetUpdateWithoutIncomesInput>, MonthlyBudgetUncheckedUpdateWithoutIncomesInput>
  }

  export type MonthlyBudgetCreateNestedOneWithoutChargesInput = {
    create?: XOR<MonthlyBudgetCreateWithoutChargesInput, MonthlyBudgetUncheckedCreateWithoutChargesInput>
    connectOrCreate?: MonthlyBudgetCreateOrConnectWithoutChargesInput
    connect?: MonthlyBudgetWhereUniqueInput
  }

  export type MonthlyBudgetUpdateOneRequiredWithoutChargesNestedInput = {
    create?: XOR<MonthlyBudgetCreateWithoutChargesInput, MonthlyBudgetUncheckedCreateWithoutChargesInput>
    connectOrCreate?: MonthlyBudgetCreateOrConnectWithoutChargesInput
    upsert?: MonthlyBudgetUpsertWithoutChargesInput
    connect?: MonthlyBudgetWhereUniqueInput
    update?: XOR<XOR<MonthlyBudgetUpdateToOneWithWhereWithoutChargesInput, MonthlyBudgetUpdateWithoutChargesInput>, MonthlyBudgetUncheckedUpdateWithoutChargesInput>
  }

  export type MonthlyBudgetCreateNestedOneWithoutExpensesInput = {
    create?: XOR<MonthlyBudgetCreateWithoutExpensesInput, MonthlyBudgetUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: MonthlyBudgetCreateOrConnectWithoutExpensesInput
    connect?: MonthlyBudgetWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type MonthlyBudgetUpdateOneRequiredWithoutExpensesNestedInput = {
    create?: XOR<MonthlyBudgetCreateWithoutExpensesInput, MonthlyBudgetUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: MonthlyBudgetCreateOrConnectWithoutExpensesInput
    upsert?: MonthlyBudgetUpsertWithoutExpensesInput
    connect?: MonthlyBudgetWhereUniqueInput
    update?: XOR<XOR<MonthlyBudgetUpdateToOneWithWhereWithoutExpensesInput, MonthlyBudgetUpdateWithoutExpensesInput>, MonthlyBudgetUncheckedUpdateWithoutExpensesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FixedIncomeCreateWithoutUserInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type FixedIncomeUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type FixedIncomeCreateOrConnectWithoutUserInput = {
    where: FixedIncomeWhereUniqueInput
    create: XOR<FixedIncomeCreateWithoutUserInput, FixedIncomeUncheckedCreateWithoutUserInput>
  }

  export type FixedIncomeCreateManyUserInputEnvelope = {
    data: FixedIncomeCreateManyUserInput | FixedIncomeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FixedChargeCreateWithoutUserInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type FixedChargeUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type FixedChargeCreateOrConnectWithoutUserInput = {
    where: FixedChargeWhereUniqueInput
    create: XOR<FixedChargeCreateWithoutUserInput, FixedChargeUncheckedCreateWithoutUserInput>
  }

  export type FixedChargeCreateManyUserInputEnvelope = {
    data: FixedChargeCreateManyUserInput | FixedChargeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MonthlyBudgetCreateWithoutUserInput = {
    id?: string
    month: number
    year: number
    isCurrent?: boolean
    remainingBudget: Decimal | DecimalJsLike | number | string
    weeklyBudget: Decimal | DecimalJsLike | number | string
    numberOfWeeks: number
    createdAt?: Date | string
    incomes?: MonthlyIncomeCreateNestedManyWithoutMonthlyBudgetInput
    charges?: MonthlyChargeCreateNestedManyWithoutMonthlyBudgetInput
    expenses?: WeeklyExpenseCreateNestedManyWithoutMonthlyBudgetInput
  }

  export type MonthlyBudgetUncheckedCreateWithoutUserInput = {
    id?: string
    month: number
    year: number
    isCurrent?: boolean
    remainingBudget: Decimal | DecimalJsLike | number | string
    weeklyBudget: Decimal | DecimalJsLike | number | string
    numberOfWeeks: number
    createdAt?: Date | string
    incomes?: MonthlyIncomeUncheckedCreateNestedManyWithoutMonthlyBudgetInput
    charges?: MonthlyChargeUncheckedCreateNestedManyWithoutMonthlyBudgetInput
    expenses?: WeeklyExpenseUncheckedCreateNestedManyWithoutMonthlyBudgetInput
  }

  export type MonthlyBudgetCreateOrConnectWithoutUserInput = {
    where: MonthlyBudgetWhereUniqueInput
    create: XOR<MonthlyBudgetCreateWithoutUserInput, MonthlyBudgetUncheckedCreateWithoutUserInput>
  }

  export type MonthlyBudgetCreateManyUserInputEnvelope = {
    data: MonthlyBudgetCreateManyUserInput | MonthlyBudgetCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type FixedIncomeUpsertWithWhereUniqueWithoutUserInput = {
    where: FixedIncomeWhereUniqueInput
    update: XOR<FixedIncomeUpdateWithoutUserInput, FixedIncomeUncheckedUpdateWithoutUserInput>
    create: XOR<FixedIncomeCreateWithoutUserInput, FixedIncomeUncheckedCreateWithoutUserInput>
  }

  export type FixedIncomeUpdateWithWhereUniqueWithoutUserInput = {
    where: FixedIncomeWhereUniqueInput
    data: XOR<FixedIncomeUpdateWithoutUserInput, FixedIncomeUncheckedUpdateWithoutUserInput>
  }

  export type FixedIncomeUpdateManyWithWhereWithoutUserInput = {
    where: FixedIncomeScalarWhereInput
    data: XOR<FixedIncomeUpdateManyMutationInput, FixedIncomeUncheckedUpdateManyWithoutUserInput>
  }

  export type FixedIncomeScalarWhereInput = {
    AND?: FixedIncomeScalarWhereInput | FixedIncomeScalarWhereInput[]
    OR?: FixedIncomeScalarWhereInput[]
    NOT?: FixedIncomeScalarWhereInput | FixedIncomeScalarWhereInput[]
    id?: StringFilter<"FixedIncome"> | string
    name?: StringFilter<"FixedIncome"> | string
    amount?: DecimalFilter<"FixedIncome"> | Decimal | DecimalJsLike | number | string
    userId?: StringFilter<"FixedIncome"> | string
    createdAt?: DateTimeFilter<"FixedIncome"> | Date | string
  }

  export type FixedChargeUpsertWithWhereUniqueWithoutUserInput = {
    where: FixedChargeWhereUniqueInput
    update: XOR<FixedChargeUpdateWithoutUserInput, FixedChargeUncheckedUpdateWithoutUserInput>
    create: XOR<FixedChargeCreateWithoutUserInput, FixedChargeUncheckedCreateWithoutUserInput>
  }

  export type FixedChargeUpdateWithWhereUniqueWithoutUserInput = {
    where: FixedChargeWhereUniqueInput
    data: XOR<FixedChargeUpdateWithoutUserInput, FixedChargeUncheckedUpdateWithoutUserInput>
  }

  export type FixedChargeUpdateManyWithWhereWithoutUserInput = {
    where: FixedChargeScalarWhereInput
    data: XOR<FixedChargeUpdateManyMutationInput, FixedChargeUncheckedUpdateManyWithoutUserInput>
  }

  export type FixedChargeScalarWhereInput = {
    AND?: FixedChargeScalarWhereInput | FixedChargeScalarWhereInput[]
    OR?: FixedChargeScalarWhereInput[]
    NOT?: FixedChargeScalarWhereInput | FixedChargeScalarWhereInput[]
    id?: StringFilter<"FixedCharge"> | string
    name?: StringFilter<"FixedCharge"> | string
    amount?: DecimalFilter<"FixedCharge"> | Decimal | DecimalJsLike | number | string
    userId?: StringFilter<"FixedCharge"> | string
    createdAt?: DateTimeFilter<"FixedCharge"> | Date | string
  }

  export type MonthlyBudgetUpsertWithWhereUniqueWithoutUserInput = {
    where: MonthlyBudgetWhereUniqueInput
    update: XOR<MonthlyBudgetUpdateWithoutUserInput, MonthlyBudgetUncheckedUpdateWithoutUserInput>
    create: XOR<MonthlyBudgetCreateWithoutUserInput, MonthlyBudgetUncheckedCreateWithoutUserInput>
  }

  export type MonthlyBudgetUpdateWithWhereUniqueWithoutUserInput = {
    where: MonthlyBudgetWhereUniqueInput
    data: XOR<MonthlyBudgetUpdateWithoutUserInput, MonthlyBudgetUncheckedUpdateWithoutUserInput>
  }

  export type MonthlyBudgetUpdateManyWithWhereWithoutUserInput = {
    where: MonthlyBudgetScalarWhereInput
    data: XOR<MonthlyBudgetUpdateManyMutationInput, MonthlyBudgetUncheckedUpdateManyWithoutUserInput>
  }

  export type MonthlyBudgetScalarWhereInput = {
    AND?: MonthlyBudgetScalarWhereInput | MonthlyBudgetScalarWhereInput[]
    OR?: MonthlyBudgetScalarWhereInput[]
    NOT?: MonthlyBudgetScalarWhereInput | MonthlyBudgetScalarWhereInput[]
    id?: StringFilter<"MonthlyBudget"> | string
    month?: IntFilter<"MonthlyBudget"> | number
    year?: IntFilter<"MonthlyBudget"> | number
    isCurrent?: BoolFilter<"MonthlyBudget"> | boolean
    remainingBudget?: DecimalFilter<"MonthlyBudget"> | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFilter<"MonthlyBudget"> | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFilter<"MonthlyBudget"> | number
    userId?: StringFilter<"MonthlyBudget"> | string
    createdAt?: DateTimeFilter<"MonthlyBudget"> | Date | string
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    fixedIncomes?: FixedIncomeCreateNestedManyWithoutUserInput
    fixedCharges?: FixedChargeCreateNestedManyWithoutUserInput
    monthlyBudgets?: MonthlyBudgetCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    fixedIncomes?: FixedIncomeUncheckedCreateNestedManyWithoutUserInput
    fixedCharges?: FixedChargeUncheckedCreateNestedManyWithoutUserInput
    monthlyBudgets?: MonthlyBudgetUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fixedIncomes?: FixedIncomeUpdateManyWithoutUserNestedInput
    fixedCharges?: FixedChargeUpdateManyWithoutUserNestedInput
    monthlyBudgets?: MonthlyBudgetUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fixedIncomes?: FixedIncomeUncheckedUpdateManyWithoutUserNestedInput
    fixedCharges?: FixedChargeUncheckedUpdateManyWithoutUserNestedInput
    monthlyBudgets?: MonthlyBudgetUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFixedIncomesInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    fixedCharges?: FixedChargeCreateNestedManyWithoutUserInput
    monthlyBudgets?: MonthlyBudgetCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFixedIncomesInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    fixedCharges?: FixedChargeUncheckedCreateNestedManyWithoutUserInput
    monthlyBudgets?: MonthlyBudgetUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFixedIncomesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFixedIncomesInput, UserUncheckedCreateWithoutFixedIncomesInput>
  }

  export type UserUpsertWithoutFixedIncomesInput = {
    update: XOR<UserUpdateWithoutFixedIncomesInput, UserUncheckedUpdateWithoutFixedIncomesInput>
    create: XOR<UserCreateWithoutFixedIncomesInput, UserUncheckedCreateWithoutFixedIncomesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFixedIncomesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFixedIncomesInput, UserUncheckedUpdateWithoutFixedIncomesInput>
  }

  export type UserUpdateWithoutFixedIncomesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    fixedCharges?: FixedChargeUpdateManyWithoutUserNestedInput
    monthlyBudgets?: MonthlyBudgetUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFixedIncomesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    fixedCharges?: FixedChargeUncheckedUpdateManyWithoutUserNestedInput
    monthlyBudgets?: MonthlyBudgetUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFixedChargesInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    fixedIncomes?: FixedIncomeCreateNestedManyWithoutUserInput
    monthlyBudgets?: MonthlyBudgetCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFixedChargesInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    fixedIncomes?: FixedIncomeUncheckedCreateNestedManyWithoutUserInput
    monthlyBudgets?: MonthlyBudgetUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFixedChargesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFixedChargesInput, UserUncheckedCreateWithoutFixedChargesInput>
  }

  export type UserUpsertWithoutFixedChargesInput = {
    update: XOR<UserUpdateWithoutFixedChargesInput, UserUncheckedUpdateWithoutFixedChargesInput>
    create: XOR<UserCreateWithoutFixedChargesInput, UserUncheckedCreateWithoutFixedChargesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFixedChargesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFixedChargesInput, UserUncheckedUpdateWithoutFixedChargesInput>
  }

  export type UserUpdateWithoutFixedChargesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    fixedIncomes?: FixedIncomeUpdateManyWithoutUserNestedInput
    monthlyBudgets?: MonthlyBudgetUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFixedChargesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    fixedIncomes?: FixedIncomeUncheckedUpdateManyWithoutUserNestedInput
    monthlyBudgets?: MonthlyBudgetUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutMonthlyBudgetsInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    fixedIncomes?: FixedIncomeCreateNestedManyWithoutUserInput
    fixedCharges?: FixedChargeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMonthlyBudgetsInput = {
    id?: string
    email: string
    password: string
    name: string
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    fixedIncomes?: FixedIncomeUncheckedCreateNestedManyWithoutUserInput
    fixedCharges?: FixedChargeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMonthlyBudgetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMonthlyBudgetsInput, UserUncheckedCreateWithoutMonthlyBudgetsInput>
  }

  export type MonthlyIncomeCreateWithoutMonthlyBudgetInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type MonthlyIncomeUncheckedCreateWithoutMonthlyBudgetInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type MonthlyIncomeCreateOrConnectWithoutMonthlyBudgetInput = {
    where: MonthlyIncomeWhereUniqueInput
    create: XOR<MonthlyIncomeCreateWithoutMonthlyBudgetInput, MonthlyIncomeUncheckedCreateWithoutMonthlyBudgetInput>
  }

  export type MonthlyIncomeCreateManyMonthlyBudgetInputEnvelope = {
    data: MonthlyIncomeCreateManyMonthlyBudgetInput | MonthlyIncomeCreateManyMonthlyBudgetInput[]
    skipDuplicates?: boolean
  }

  export type MonthlyChargeCreateWithoutMonthlyBudgetInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type MonthlyChargeUncheckedCreateWithoutMonthlyBudgetInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type MonthlyChargeCreateOrConnectWithoutMonthlyBudgetInput = {
    where: MonthlyChargeWhereUniqueInput
    create: XOR<MonthlyChargeCreateWithoutMonthlyBudgetInput, MonthlyChargeUncheckedCreateWithoutMonthlyBudgetInput>
  }

  export type MonthlyChargeCreateManyMonthlyBudgetInputEnvelope = {
    data: MonthlyChargeCreateManyMonthlyBudgetInput | MonthlyChargeCreateManyMonthlyBudgetInput[]
    skipDuplicates?: boolean
  }

  export type WeeklyExpenseCreateWithoutMonthlyBudgetInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    weekNumber: number
    category?: string | null
    createdAt?: Date | string
  }

  export type WeeklyExpenseUncheckedCreateWithoutMonthlyBudgetInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    weekNumber: number
    category?: string | null
    createdAt?: Date | string
  }

  export type WeeklyExpenseCreateOrConnectWithoutMonthlyBudgetInput = {
    where: WeeklyExpenseWhereUniqueInput
    create: XOR<WeeklyExpenseCreateWithoutMonthlyBudgetInput, WeeklyExpenseUncheckedCreateWithoutMonthlyBudgetInput>
  }

  export type WeeklyExpenseCreateManyMonthlyBudgetInputEnvelope = {
    data: WeeklyExpenseCreateManyMonthlyBudgetInput | WeeklyExpenseCreateManyMonthlyBudgetInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMonthlyBudgetsInput = {
    update: XOR<UserUpdateWithoutMonthlyBudgetsInput, UserUncheckedUpdateWithoutMonthlyBudgetsInput>
    create: XOR<UserCreateWithoutMonthlyBudgetsInput, UserUncheckedCreateWithoutMonthlyBudgetsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMonthlyBudgetsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMonthlyBudgetsInput, UserUncheckedUpdateWithoutMonthlyBudgetsInput>
  }

  export type UserUpdateWithoutMonthlyBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    fixedIncomes?: FixedIncomeUpdateManyWithoutUserNestedInput
    fixedCharges?: FixedChargeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMonthlyBudgetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    fixedIncomes?: FixedIncomeUncheckedUpdateManyWithoutUserNestedInput
    fixedCharges?: FixedChargeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MonthlyIncomeUpsertWithWhereUniqueWithoutMonthlyBudgetInput = {
    where: MonthlyIncomeWhereUniqueInput
    update: XOR<MonthlyIncomeUpdateWithoutMonthlyBudgetInput, MonthlyIncomeUncheckedUpdateWithoutMonthlyBudgetInput>
    create: XOR<MonthlyIncomeCreateWithoutMonthlyBudgetInput, MonthlyIncomeUncheckedCreateWithoutMonthlyBudgetInput>
  }

  export type MonthlyIncomeUpdateWithWhereUniqueWithoutMonthlyBudgetInput = {
    where: MonthlyIncomeWhereUniqueInput
    data: XOR<MonthlyIncomeUpdateWithoutMonthlyBudgetInput, MonthlyIncomeUncheckedUpdateWithoutMonthlyBudgetInput>
  }

  export type MonthlyIncomeUpdateManyWithWhereWithoutMonthlyBudgetInput = {
    where: MonthlyIncomeScalarWhereInput
    data: XOR<MonthlyIncomeUpdateManyMutationInput, MonthlyIncomeUncheckedUpdateManyWithoutMonthlyBudgetInput>
  }

  export type MonthlyIncomeScalarWhereInput = {
    AND?: MonthlyIncomeScalarWhereInput | MonthlyIncomeScalarWhereInput[]
    OR?: MonthlyIncomeScalarWhereInput[]
    NOT?: MonthlyIncomeScalarWhereInput | MonthlyIncomeScalarWhereInput[]
    id?: StringFilter<"MonthlyIncome"> | string
    name?: StringFilter<"MonthlyIncome"> | string
    amount?: DecimalFilter<"MonthlyIncome"> | Decimal | DecimalJsLike | number | string
    monthlyBudgetId?: StringFilter<"MonthlyIncome"> | string
    createdAt?: DateTimeFilter<"MonthlyIncome"> | Date | string
  }

  export type MonthlyChargeUpsertWithWhereUniqueWithoutMonthlyBudgetInput = {
    where: MonthlyChargeWhereUniqueInput
    update: XOR<MonthlyChargeUpdateWithoutMonthlyBudgetInput, MonthlyChargeUncheckedUpdateWithoutMonthlyBudgetInput>
    create: XOR<MonthlyChargeCreateWithoutMonthlyBudgetInput, MonthlyChargeUncheckedCreateWithoutMonthlyBudgetInput>
  }

  export type MonthlyChargeUpdateWithWhereUniqueWithoutMonthlyBudgetInput = {
    where: MonthlyChargeWhereUniqueInput
    data: XOR<MonthlyChargeUpdateWithoutMonthlyBudgetInput, MonthlyChargeUncheckedUpdateWithoutMonthlyBudgetInput>
  }

  export type MonthlyChargeUpdateManyWithWhereWithoutMonthlyBudgetInput = {
    where: MonthlyChargeScalarWhereInput
    data: XOR<MonthlyChargeUpdateManyMutationInput, MonthlyChargeUncheckedUpdateManyWithoutMonthlyBudgetInput>
  }

  export type MonthlyChargeScalarWhereInput = {
    AND?: MonthlyChargeScalarWhereInput | MonthlyChargeScalarWhereInput[]
    OR?: MonthlyChargeScalarWhereInput[]
    NOT?: MonthlyChargeScalarWhereInput | MonthlyChargeScalarWhereInput[]
    id?: StringFilter<"MonthlyCharge"> | string
    name?: StringFilter<"MonthlyCharge"> | string
    amount?: DecimalFilter<"MonthlyCharge"> | Decimal | DecimalJsLike | number | string
    monthlyBudgetId?: StringFilter<"MonthlyCharge"> | string
    createdAt?: DateTimeFilter<"MonthlyCharge"> | Date | string
  }

  export type WeeklyExpenseUpsertWithWhereUniqueWithoutMonthlyBudgetInput = {
    where: WeeklyExpenseWhereUniqueInput
    update: XOR<WeeklyExpenseUpdateWithoutMonthlyBudgetInput, WeeklyExpenseUncheckedUpdateWithoutMonthlyBudgetInput>
    create: XOR<WeeklyExpenseCreateWithoutMonthlyBudgetInput, WeeklyExpenseUncheckedCreateWithoutMonthlyBudgetInput>
  }

  export type WeeklyExpenseUpdateWithWhereUniqueWithoutMonthlyBudgetInput = {
    where: WeeklyExpenseWhereUniqueInput
    data: XOR<WeeklyExpenseUpdateWithoutMonthlyBudgetInput, WeeklyExpenseUncheckedUpdateWithoutMonthlyBudgetInput>
  }

  export type WeeklyExpenseUpdateManyWithWhereWithoutMonthlyBudgetInput = {
    where: WeeklyExpenseScalarWhereInput
    data: XOR<WeeklyExpenseUpdateManyMutationInput, WeeklyExpenseUncheckedUpdateManyWithoutMonthlyBudgetInput>
  }

  export type WeeklyExpenseScalarWhereInput = {
    AND?: WeeklyExpenseScalarWhereInput | WeeklyExpenseScalarWhereInput[]
    OR?: WeeklyExpenseScalarWhereInput[]
    NOT?: WeeklyExpenseScalarWhereInput | WeeklyExpenseScalarWhereInput[]
    id?: StringFilter<"WeeklyExpense"> | string
    name?: StringFilter<"WeeklyExpense"> | string
    amount?: DecimalFilter<"WeeklyExpense"> | Decimal | DecimalJsLike | number | string
    weekNumber?: IntFilter<"WeeklyExpense"> | number
    category?: StringNullableFilter<"WeeklyExpense"> | string | null
    monthlyBudgetId?: StringFilter<"WeeklyExpense"> | string
    createdAt?: DateTimeFilter<"WeeklyExpense"> | Date | string
  }

  export type MonthlyBudgetCreateWithoutIncomesInput = {
    id?: string
    month: number
    year: number
    isCurrent?: boolean
    remainingBudget: Decimal | DecimalJsLike | number | string
    weeklyBudget: Decimal | DecimalJsLike | number | string
    numberOfWeeks: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMonthlyBudgetsInput
    charges?: MonthlyChargeCreateNestedManyWithoutMonthlyBudgetInput
    expenses?: WeeklyExpenseCreateNestedManyWithoutMonthlyBudgetInput
  }

  export type MonthlyBudgetUncheckedCreateWithoutIncomesInput = {
    id?: string
    month: number
    year: number
    isCurrent?: boolean
    remainingBudget: Decimal | DecimalJsLike | number | string
    weeklyBudget: Decimal | DecimalJsLike | number | string
    numberOfWeeks: number
    userId: string
    createdAt?: Date | string
    charges?: MonthlyChargeUncheckedCreateNestedManyWithoutMonthlyBudgetInput
    expenses?: WeeklyExpenseUncheckedCreateNestedManyWithoutMonthlyBudgetInput
  }

  export type MonthlyBudgetCreateOrConnectWithoutIncomesInput = {
    where: MonthlyBudgetWhereUniqueInput
    create: XOR<MonthlyBudgetCreateWithoutIncomesInput, MonthlyBudgetUncheckedCreateWithoutIncomesInput>
  }

  export type MonthlyBudgetUpsertWithoutIncomesInput = {
    update: XOR<MonthlyBudgetUpdateWithoutIncomesInput, MonthlyBudgetUncheckedUpdateWithoutIncomesInput>
    create: XOR<MonthlyBudgetCreateWithoutIncomesInput, MonthlyBudgetUncheckedCreateWithoutIncomesInput>
    where?: MonthlyBudgetWhereInput
  }

  export type MonthlyBudgetUpdateToOneWithWhereWithoutIncomesInput = {
    where?: MonthlyBudgetWhereInput
    data: XOR<MonthlyBudgetUpdateWithoutIncomesInput, MonthlyBudgetUncheckedUpdateWithoutIncomesInput>
  }

  export type MonthlyBudgetUpdateWithoutIncomesInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    remainingBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMonthlyBudgetsNestedInput
    charges?: MonthlyChargeUpdateManyWithoutMonthlyBudgetNestedInput
    expenses?: WeeklyExpenseUpdateManyWithoutMonthlyBudgetNestedInput
  }

  export type MonthlyBudgetUncheckedUpdateWithoutIncomesInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    remainingBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    charges?: MonthlyChargeUncheckedUpdateManyWithoutMonthlyBudgetNestedInput
    expenses?: WeeklyExpenseUncheckedUpdateManyWithoutMonthlyBudgetNestedInput
  }

  export type MonthlyBudgetCreateWithoutChargesInput = {
    id?: string
    month: number
    year: number
    isCurrent?: boolean
    remainingBudget: Decimal | DecimalJsLike | number | string
    weeklyBudget: Decimal | DecimalJsLike | number | string
    numberOfWeeks: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMonthlyBudgetsInput
    incomes?: MonthlyIncomeCreateNestedManyWithoutMonthlyBudgetInput
    expenses?: WeeklyExpenseCreateNestedManyWithoutMonthlyBudgetInput
  }

  export type MonthlyBudgetUncheckedCreateWithoutChargesInput = {
    id?: string
    month: number
    year: number
    isCurrent?: boolean
    remainingBudget: Decimal | DecimalJsLike | number | string
    weeklyBudget: Decimal | DecimalJsLike | number | string
    numberOfWeeks: number
    userId: string
    createdAt?: Date | string
    incomes?: MonthlyIncomeUncheckedCreateNestedManyWithoutMonthlyBudgetInput
    expenses?: WeeklyExpenseUncheckedCreateNestedManyWithoutMonthlyBudgetInput
  }

  export type MonthlyBudgetCreateOrConnectWithoutChargesInput = {
    where: MonthlyBudgetWhereUniqueInput
    create: XOR<MonthlyBudgetCreateWithoutChargesInput, MonthlyBudgetUncheckedCreateWithoutChargesInput>
  }

  export type MonthlyBudgetUpsertWithoutChargesInput = {
    update: XOR<MonthlyBudgetUpdateWithoutChargesInput, MonthlyBudgetUncheckedUpdateWithoutChargesInput>
    create: XOR<MonthlyBudgetCreateWithoutChargesInput, MonthlyBudgetUncheckedCreateWithoutChargesInput>
    where?: MonthlyBudgetWhereInput
  }

  export type MonthlyBudgetUpdateToOneWithWhereWithoutChargesInput = {
    where?: MonthlyBudgetWhereInput
    data: XOR<MonthlyBudgetUpdateWithoutChargesInput, MonthlyBudgetUncheckedUpdateWithoutChargesInput>
  }

  export type MonthlyBudgetUpdateWithoutChargesInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    remainingBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMonthlyBudgetsNestedInput
    incomes?: MonthlyIncomeUpdateManyWithoutMonthlyBudgetNestedInput
    expenses?: WeeklyExpenseUpdateManyWithoutMonthlyBudgetNestedInput
  }

  export type MonthlyBudgetUncheckedUpdateWithoutChargesInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    remainingBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    incomes?: MonthlyIncomeUncheckedUpdateManyWithoutMonthlyBudgetNestedInput
    expenses?: WeeklyExpenseUncheckedUpdateManyWithoutMonthlyBudgetNestedInput
  }

  export type MonthlyBudgetCreateWithoutExpensesInput = {
    id?: string
    month: number
    year: number
    isCurrent?: boolean
    remainingBudget: Decimal | DecimalJsLike | number | string
    weeklyBudget: Decimal | DecimalJsLike | number | string
    numberOfWeeks: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMonthlyBudgetsInput
    incomes?: MonthlyIncomeCreateNestedManyWithoutMonthlyBudgetInput
    charges?: MonthlyChargeCreateNestedManyWithoutMonthlyBudgetInput
  }

  export type MonthlyBudgetUncheckedCreateWithoutExpensesInput = {
    id?: string
    month: number
    year: number
    isCurrent?: boolean
    remainingBudget: Decimal | DecimalJsLike | number | string
    weeklyBudget: Decimal | DecimalJsLike | number | string
    numberOfWeeks: number
    userId: string
    createdAt?: Date | string
    incomes?: MonthlyIncomeUncheckedCreateNestedManyWithoutMonthlyBudgetInput
    charges?: MonthlyChargeUncheckedCreateNestedManyWithoutMonthlyBudgetInput
  }

  export type MonthlyBudgetCreateOrConnectWithoutExpensesInput = {
    where: MonthlyBudgetWhereUniqueInput
    create: XOR<MonthlyBudgetCreateWithoutExpensesInput, MonthlyBudgetUncheckedCreateWithoutExpensesInput>
  }

  export type MonthlyBudgetUpsertWithoutExpensesInput = {
    update: XOR<MonthlyBudgetUpdateWithoutExpensesInput, MonthlyBudgetUncheckedUpdateWithoutExpensesInput>
    create: XOR<MonthlyBudgetCreateWithoutExpensesInput, MonthlyBudgetUncheckedCreateWithoutExpensesInput>
    where?: MonthlyBudgetWhereInput
  }

  export type MonthlyBudgetUpdateToOneWithWhereWithoutExpensesInput = {
    where?: MonthlyBudgetWhereInput
    data: XOR<MonthlyBudgetUpdateWithoutExpensesInput, MonthlyBudgetUncheckedUpdateWithoutExpensesInput>
  }

  export type MonthlyBudgetUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    remainingBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMonthlyBudgetsNestedInput
    incomes?: MonthlyIncomeUpdateManyWithoutMonthlyBudgetNestedInput
    charges?: MonthlyChargeUpdateManyWithoutMonthlyBudgetNestedInput
  }

  export type MonthlyBudgetUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    remainingBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    incomes?: MonthlyIncomeUncheckedUpdateManyWithoutMonthlyBudgetNestedInput
    charges?: MonthlyChargeUncheckedUpdateManyWithoutMonthlyBudgetNestedInput
  }

  export type SessionCreateManyUserInput = {
    id?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type FixedIncomeCreateManyUserInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type FixedChargeCreateManyUserInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type MonthlyBudgetCreateManyUserInput = {
    id?: string
    month: number
    year: number
    isCurrent?: boolean
    remainingBudget: Decimal | DecimalJsLike | number | string
    weeklyBudget: Decimal | DecimalJsLike | number | string
    numberOfWeeks: number
    createdAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FixedIncomeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FixedIncomeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FixedIncomeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FixedChargeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FixedChargeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FixedChargeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyBudgetUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    remainingBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    incomes?: MonthlyIncomeUpdateManyWithoutMonthlyBudgetNestedInput
    charges?: MonthlyChargeUpdateManyWithoutMonthlyBudgetNestedInput
    expenses?: WeeklyExpenseUpdateManyWithoutMonthlyBudgetNestedInput
  }

  export type MonthlyBudgetUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    remainingBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    incomes?: MonthlyIncomeUncheckedUpdateManyWithoutMonthlyBudgetNestedInput
    charges?: MonthlyChargeUncheckedUpdateManyWithoutMonthlyBudgetNestedInput
    expenses?: WeeklyExpenseUncheckedUpdateManyWithoutMonthlyBudgetNestedInput
  }

  export type MonthlyBudgetUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    remainingBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weeklyBudget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    numberOfWeeks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyIncomeCreateManyMonthlyBudgetInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type MonthlyChargeCreateManyMonthlyBudgetInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type WeeklyExpenseCreateManyMonthlyBudgetInput = {
    id?: string
    name: string
    amount: Decimal | DecimalJsLike | number | string
    weekNumber: number
    category?: string | null
    createdAt?: Date | string
  }

  export type MonthlyIncomeUpdateWithoutMonthlyBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyIncomeUncheckedUpdateWithoutMonthlyBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyIncomeUncheckedUpdateManyWithoutMonthlyBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyChargeUpdateWithoutMonthlyBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyChargeUncheckedUpdateWithoutMonthlyBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyChargeUncheckedUpdateManyWithoutMonthlyBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyExpenseUpdateWithoutMonthlyBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyExpenseUncheckedUpdateWithoutMonthlyBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyExpenseUncheckedUpdateManyWithoutMonthlyBudgetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MonthlyBudgetCountOutputTypeDefaultArgs instead
     */
    export type MonthlyBudgetCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MonthlyBudgetCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FixedIncomeDefaultArgs instead
     */
    export type FixedIncomeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FixedIncomeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FixedChargeDefaultArgs instead
     */
    export type FixedChargeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FixedChargeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MonthlyBudgetDefaultArgs instead
     */
    export type MonthlyBudgetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MonthlyBudgetDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MonthlyIncomeDefaultArgs instead
     */
    export type MonthlyIncomeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MonthlyIncomeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MonthlyChargeDefaultArgs instead
     */
    export type MonthlyChargeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MonthlyChargeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WeeklyExpenseDefaultArgs instead
     */
    export type WeeklyExpenseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WeeklyExpenseDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}