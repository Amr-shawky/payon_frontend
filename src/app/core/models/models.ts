// ===== AUTH =====
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  name: string;
  email: string;
  role: string;
}

// ===== PAGINATION =====
export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  size: number;
  totalPages: number;
}

export interface ApiResult<T> {
  isSuccess: boolean;
  message: string;
  data: T;
  errors: string[];
  code: number;
}

// ===== USERS =====
export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  state: string;
  role: string;
  countryId: number;
  countryName: string;
  createdAt: string;
  isActive: boolean;
  accountType: string;
}

export interface UsersSummaryDto {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  pendingUsers: number;
  newUsersThisMonth: number;
}

// ===== ACCOUNTS =====
export interface AccountDetailsList {
  id: string;
  ipa: string;
  balance: number;
  currencyCode: string;
  currencyName: string;
  accountTypeName: string;
  isActive: boolean;
  isDefault: boolean;
  userId: string;
  userName: string;
  userEmail: string;
  createdAt: string;
  state: string;
}

export interface WalletResponse {
  id: string;
  ipa: string;
  balance: number;
  currencyCode: string;
  isActive: boolean;
  isDefault: boolean;
  accountTypeName: string;
}

// ===== TRANSACTIONS =====
export interface TransactionGetter {
  id: number;
  amount: number;
  fee: number;
  netAmount: number;
  currencyCode: string;
  transactionType: string;
  status: string;
  senderIpa: string;
  receiverIpa: string;
  createdAt: string;
  completedAt: string;
  description: string;
}

export interface TransactionSummaryResponse {
  totalTransactions: number;
  totalVolume: number;
  totalFees: number;
  successRate: number;
  currencyCode: string;
}

export interface PaymentMethodTransactionsResponse {
  wallet: number;
  card: number;
  bank: number;
  qr: number;
  online: number;
}

export interface MonthlyTransactionStat {
  month: string;
  count: number;
  volume: number;
  fees: number;
}

export interface TransactionStateStat {
  month: string;
  completed: number;
  pending: number;
  failed: number;
  cancelled: number;
}

// ===== ACTIVITY LOGS (Audit) =====
export interface ActivityLog {
  id: number;
  timestamp: string;
  userId: string;
  fullName: string;
  userEmail: string;
  phoneNumber: string;
  userRole: string;
  controller: string;
  action: string;
  actionDescription: string;
  httpMethod: string;
  route: string;
  queryString: string;
  responseStatus: number;
  isSuccessful: boolean;
  ipAddress: string;
  country: string;
  city: string;
  region: string;
  isp: string;
  deviceType: string;
  deviceModel: string;
  deviceOS: string;
  browser: string;
  browserVersion: string;
  appVersion: string;
  networkType: string;
  isAuthenticated: boolean;
  requestId: string;
}

// ===== SERVICE TYPES =====
export interface ServiceTypeItem {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

// ===== COMMISSIONS =====
export interface CommissionGroupListDto {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  isDefault: boolean;
  createdAt: string;
  accountCount: number;
  commissionCount: number;
}

export interface CommissionDTO {
  id: number;
  transactionTypeId: number;
  transactionTypeName: string;
  type: string; // Percentage | Fixed
  value: number;
  minAmount: number;
  maxAmount: number;
}

// ===== LIMITS =====
export interface LimitType {
  id: number;
  type: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export interface LimitGroup {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  isDefault: boolean;
  createdAt: string;
  accountCount: number;
}

export interface LimitItem {
  id: number;
  limitTypeName: string;
  limitGroupName: string;
  value: number;
  isActive: boolean;
  createdAt: string;
}

// ===== CURRENCIES =====
export interface CurrencyItem {
  id: number;
  name: string;
  arName: string;
  code: string;
  exchangeRate: number;
  countryName: string;
  isActive: boolean;
  createdAt: string;
}

// ===== COUNTRIES =====
export interface CountryItem {
  id: number;
  name: string;
  arName: string;
  iso: string;
  code: string;
  phoneCode: number;
  numCode: number;
  isActive: boolean;
  createdAt: string;
}

// ===== OTP =====
export interface OtpCodeItem {
  id: number;
  emailOrPhone: string;
  isForgotPassword: boolean;
  isUsed: boolean;
  createdAt: string;
  expiresAt: string;
}

// ===== INVITATION =====
export interface InvitationUser {
  id: string;
  userName: string;
  userEmail: string;
  referralCode: string;
  referredByName: string;
  bonusAmount: number;
  isPaid: boolean;
  createdAt: string;
}

export interface InvitationSettings {
  bonusAmount: number;
  durationInHours: number;
  description: string;
  arDescription: string;
}

// ===== DASHBOARD KPIs =====
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalAccounts: number;
  totalTransactions: number;
  totalVolume: number;
  totalRevenue: number;
  pendingAccounts: number;
  activeAccounts: number;
}

// ===== ACCOUNT TYPE =====
export interface AccountType {
  id: number;
  type: string;
  arType: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}
