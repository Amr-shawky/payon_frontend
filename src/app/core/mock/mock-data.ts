import {
  DashboardStats, UserResponse, UsersSummaryDto, ActivityLog,
  CommissionGroupListDto, CommissionDTO, LimitType, LimitGroup,
  LimitItem, CurrencyItem, CountryItem, OtpCodeItem, InvitationUser,
  InvitationSettings, AccountDetailsList, TransactionGetter,
  TransactionSummaryResponse, PaymentMethodTransactionsResponse,
  MonthlyTransactionStat, TransactionStateStat, AccountType, ServiceTypeItem
} from '../models/models';

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalUsers: 12847,
  activeUsers: 10234,
  totalAccounts: 18925,
  totalTransactions: 94712,
  totalVolume: 4823910.50,
  totalRevenue: 48239.10,
  pendingAccounts: 347,
  activeAccounts: 17891
};

export const MOCK_USERS_SUMMARY: UsersSummaryDto = {
  totalUsers: 12847,
  activeUsers: 10234,
  inactiveUsers: 1849,
  pendingUsers: 764,
  newUsersThisMonth: 1203
};

export const MOCK_USERS: UserResponse[] = [
  { id: 'u1', name: 'Ahmed Al-Rashid', email: 'ahmed@email.com', phoneNumber: '+966501234567', state: 'Active', role: 'User', countryId: 1, countryName: 'Saudi Arabia', createdAt: '2025-01-15T10:00:00Z', isActive: true, accountType: 'Personal' },
  { id: 'u2', name: 'Sara Mohammed', email: 'sara@email.com', phoneNumber: '+971501234567', state: 'Active', role: 'Merchant', countryId: 2, countryName: 'UAE', createdAt: '2025-02-20T09:30:00Z', isActive: true, accountType: 'Business' },
  { id: 'u3', name: 'Omar Hassan', email: 'omar@email.com', phoneNumber: '+962791234567', state: 'Pending', role: 'User', countryId: 3, countryName: 'Jordan', createdAt: '2025-03-05T14:00:00Z', isActive: false, accountType: 'Personal' },
  { id: 'u4', name: 'Fatima Al-Zahra', email: 'fatima@email.com', phoneNumber: '+966551234567', state: 'Active', role: 'User', countryId: 1, countryName: 'Saudi Arabia', createdAt: '2025-03-10T11:00:00Z', isActive: true, accountType: 'Personal' },
  { id: 'u5', name: 'Khalid Bin Sultan', email: 'khalid@email.com', phoneNumber: '+971521234567', state: 'Inactive', role: 'User', countryId: 2, countryName: 'UAE', createdAt: '2025-01-25T08:00:00Z', isActive: false, accountType: 'Personal' },
  { id: 'u6', name: 'Nour Al-Deen', email: 'nour@email.com', phoneNumber: '+966531234567', state: 'Active', role: 'Merchant', countryId: 1, countryName: 'Saudi Arabia', createdAt: '2025-04-01T12:00:00Z', isActive: true, accountType: 'Business' },
  { id: 'u7', name: 'Layla Ibrahim', email: 'layla@email.com', phoneNumber: '+962781234567', state: 'Active', role: 'User', countryId: 3, countryName: 'Jordan', createdAt: '2025-04-05T09:00:00Z', isActive: true, accountType: 'Personal' },
  { id: 'u8', name: 'Yusuf Al-Farsi', email: 'yusuf@email.com', phoneNumber: '+96891234567', state: 'Pending', role: 'User', countryId: 4, countryName: 'Oman', createdAt: '2025-04-08T16:00:00Z', isActive: false, accountType: 'Personal' },
  { id: 'u9', name: 'Mariam Qasem', email: 'mariam@email.com', phoneNumber: '+96522345678', state: 'Active', role: 'User', countryId: 5, countryName: 'Kuwait', createdAt: '2025-02-14T10:30:00Z', isActive: true, accountType: 'Personal' },
  { id: 'u10', name: 'Hassan Al-Turki', email: 'hassan@email.com', phoneNumber: '+966541234567', state: 'Active', role: 'Admin', countryId: 1, countryName: 'Saudi Arabia', createdAt: '2024-12-01T08:00:00Z', isActive: true, accountType: 'Admin' },
];

export const MOCK_ACCOUNTS: AccountDetailsList[] = [
  { id: 'a1', ipa: 'ahmed@payon', balance: 15240.50, currencyCode: 'SAR', currencyName: 'Saudi Riyal', accountTypeName: 'Personal', isActive: true, isDefault: true, userId: 'u1', userName: 'Ahmed Al-Rashid', userEmail: 'ahmed@email.com', createdAt: '2025-01-15T10:00:00Z', state: 'Approved' },
  { id: 'a2', ipa: 'sara.biz@payon', balance: 87500.00, currencyCode: 'AED', currencyName: 'UAE Dirham', accountTypeName: 'Business', isActive: true, isDefault: true, userId: 'u2', userName: 'Sara Mohammed', userEmail: 'sara@email.com', createdAt: '2025-02-20T09:30:00Z', state: 'Approved' },
  { id: 'a3', ipa: 'omar@payon', balance: 2100.75, currencyCode: 'JOD', currencyName: 'Jordanian Dinar', accountTypeName: 'Personal', isActive: false, isDefault: true, userId: 'u3', userName: 'Omar Hassan', userEmail: 'omar@email.com', createdAt: '2025-03-05T14:00:00Z', state: 'Pending' },
  { id: 'a4', ipa: 'fatima@payon', balance: 5870.25, currencyCode: 'SAR', currencyName: 'Saudi Riyal', accountTypeName: 'Personal', isActive: true, isDefault: true, userId: 'u4', userName: 'Fatima Al-Zahra', userEmail: 'fatima@email.com', createdAt: '2025-03-10T11:00:00Z', state: 'Approved' },
  { id: 'a5', ipa: 'khalid@payon', balance: 0.00, currencyCode: 'AED', currencyName: 'UAE Dirham', accountTypeName: 'Personal', isActive: false, isDefault: false, userId: 'u5', userName: 'Khalid Bin Sultan', userEmail: 'khalid@email.com', createdAt: '2025-01-25T08:00:00Z', state: 'Rejected' },
  { id: 'a6', ipa: 'nour.shop@payon', balance: 42300.00, currencyCode: 'SAR', currencyName: 'Saudi Riyal', accountTypeName: 'Business', isActive: true, isDefault: true, userId: 'u6', userName: 'Nour Al-Deen', userEmail: 'nour@email.com', createdAt: '2025-04-01T12:00:00Z', state: 'Approved' },
  { id: 'a7', ipa: 'layla@payon', balance: 3200.00, currencyCode: 'JOD', currencyName: 'Jordanian Dinar', accountTypeName: 'Personal', isActive: true, isDefault: true, userId: 'u7', userName: 'Layla Ibrahim', userEmail: 'layla@email.com', createdAt: '2025-04-05T09:00:00Z', state: 'Approved' },
  { id: 'a8', ipa: 'yusuf@payon', balance: 1500.00, currencyCode: 'OMR', currencyName: 'Omani Rial', accountTypeName: 'Personal', isActive: false, isDefault: true, userId: 'u8', userName: 'Yusuf Al-Farsi', userEmail: 'yusuf@email.com', createdAt: '2025-04-08T16:00:00Z', state: 'Pending' },
];

export const MOCK_TRANSACTIONS: TransactionGetter[] = [
  { id: 1, amount: 500.00, fee: 5.00, netAmount: 495.00, currencyCode: 'SAR', transactionType: 'Transfer', status: 'Completed', senderIpa: 'ahmed@payon', receiverIpa: 'fatima@payon', createdAt: '2025-04-10T08:00:00Z', completedAt: '2025-04-10T08:01:00Z', description: 'Monthly payment' },
  { id: 2, amount: 1200.00, fee: 12.00, netAmount: 1188.00, currencyCode: 'AED', transactionType: 'Payment', status: 'Completed', senderIpa: 'khalid@payon', receiverIpa: 'sara.biz@payon', createdAt: '2025-04-10T09:15:00Z', completedAt: '2025-04-10T09:16:00Z', description: 'Invoice #1234' },
  { id: 3, amount: 300.00, fee: 3.00, netAmount: 297.00, currencyCode: 'SAR', transactionType: 'Transfer', status: 'Pending', senderIpa: 'nour.shop@payon', receiverIpa: 'ahmed@payon', createdAt: '2025-04-10T10:30:00Z', completedAt: '', description: 'Pending transfer' },
  { id: 4, amount: 750.00, fee: 7.50, netAmount: 742.50, currencyCode: 'JOD', transactionType: 'Transfer', status: 'Failed', senderIpa: 'omar@payon', receiverIpa: 'layla@payon', createdAt: '2025-04-09T14:00:00Z', completedAt: '2025-04-09T14:02:00Z', description: 'Rejected — insufficient funds' },
  { id: 5, amount: 5000.00, fee: 50.00, netAmount: 4950.00, currencyCode: 'SAR', transactionType: 'Merchant Payment', status: 'Completed', senderIpa: 'fatima@payon', receiverIpa: 'nour.shop@payon', createdAt: '2025-04-09T12:00:00Z', completedAt: '2025-04-09T12:01:00Z', description: 'Online purchase' },
  { id: 6, amount: 200.00, fee: 2.00, netAmount: 198.00, currencyCode: 'AED', transactionType: 'Transfer', status: 'Completed', senderIpa: 'sara.biz@payon', receiverIpa: 'khalid@payon', createdAt: '2025-04-08T11:00:00Z', completedAt: '2025-04-08T11:01:00Z', description: 'Refund' },
  { id: 7, amount: 900.00, fee: 9.00, netAmount: 891.00, currencyCode: 'OMR', transactionType: 'Exchange', status: 'Completed', senderIpa: 'yusuf@payon', receiverIpa: 'yusuf@payon', createdAt: '2025-04-08T09:00:00Z', completedAt: '2025-04-08T09:02:00Z', description: 'Currency exchange OMR→SAR' },
  { id: 8, amount: 150.00, fee: 1.50, netAmount: 148.50, currencyCode: 'SAR', transactionType: 'Transfer', status: 'Cancelled', senderIpa: 'ahmed@payon', receiverIpa: 'nour.shop@payon', createdAt: '2025-04-07T16:00:00Z', completedAt: '', description: 'Cancelled by user' },
];

export const MOCK_TRANSACTION_SUMMARY: TransactionSummaryResponse = {
  totalTransactions: 94712,
  totalVolume: 4823910.50,
  totalFees: 48239.10,
  successRate: 94.7,
  currencyCode: 'SAR'
};

export const MOCK_PAYMENT_METHODS: PaymentMethodTransactionsResponse = {
  wallet: 54320,
  card: 21450,
  bank: 9870,
  qr: 6520,
  online: 2552
};

export const MOCK_MONTHLY_STATS: MonthlyTransactionStat[] = [
  { month: 'Oct', count: 6800, volume: 320000, fees: 3200 },
  { month: 'Nov', count: 7200, volume: 360000, fees: 3600 },
  { month: 'Dec', count: 9100, volume: 450000, fees: 4500 },
  { month: 'Jan', count: 8400, volume: 420000, fees: 4200 },
  { month: 'Feb', count: 7900, volume: 390000, fees: 3900 },
  { month: 'Mar', count: 9800, volume: 490000, fees: 4900 },
  { month: 'Apr', count: 8200, volume: 410000, fees: 4100 },
];

export const MOCK_STATES_LAST_6_MONTHS: TransactionStateStat[] = [
  { month: 'Nov', completed: 6400, pending: 450, failed: 210, cancelled: 140 },
  { month: 'Dec', completed: 8200, pending: 520, failed: 250, cancelled: 130 },
  { month: 'Jan', completed: 7600, pending: 480, failed: 220, cancelled: 100 },
  { month: 'Feb', completed: 7100, pending: 430, failed: 240, cancelled: 130 },
  { month: 'Mar', completed: 8900, pending: 530, failed: 260, cancelled: 110 },
  { month: 'Apr', completed: 7500, pending: 400, failed: 195, cancelled: 105 },
];

export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  { id: 1, timestamp: '2025-04-10T10:05:00Z', userId: 'u10', fullName: 'Hassan Al-Turki', userEmail: 'hassan@email.com', phoneNumber: '+966541234567', userRole: 'Admin', controller: 'Account', action: 'GetAllAccountsForAdmin', actionDescription: 'الحصول على جميع الحسابات', httpMethod: 'GET', route: '/api/Account/GetAllAccountsForAdmin', queryString: '?page=1&size=10', responseStatus: 200, isSuccessful: true, ipAddress: '192.168.1.1', country: 'Saudi Arabia', city: 'Riyadh', region: 'Riyadh Region', isp: 'STC', deviceType: 'Desktop', deviceModel: 'Chrome', deviceOS: 'Windows', browser: 'Chrome', browserVersion: '121.0', appVersion: '2.1.0', networkType: 'WiFi', isAuthenticated: true, requestId: 'req-001' },
  { id: 2, timestamp: '2025-04-10T09:50:00Z', userId: 'u1', fullName: 'Ahmed Al-Rashid', userEmail: 'ahmed@email.com', phoneNumber: '+966501234567', userRole: 'User', controller: 'Transaction', action: 'CreateTransactionDraft', actionDescription: 'إنشاء مسودة معاملة من ahmed@payon إلى fatima@payon بمبلغ 500', httpMethod: 'POST', route: '/api/Transaction/CreateTransactionDraft', queryString: '', responseStatus: 200, isSuccessful: true, ipAddress: '10.0.0.5', country: 'Saudi Arabia', city: 'Jeddah', region: 'Makkah Region', isp: 'Mobily', deviceType: 'Mobile', deviceModel: 'iPhone 15', deviceOS: 'iOS', browser: 'Safari', browserVersion: '17.0', appVersion: '2.1.0', networkType: '5G', isAuthenticated: true, requestId: 'req-002' },
  { id: 3, timestamp: '2025-04-10T09:30:00Z', userId: 'u2', fullName: 'Sara Mohammed', userEmail: 'sara@email.com', phoneNumber: '+971501234567', userRole: 'Merchant', controller: 'Auth', action: 'Login', actionDescription: 'تسجيل دخول المستخدم باسم المستخدم: sara@email.com', httpMethod: 'POST', route: '/api/Auth/Login', queryString: '', responseStatus: 200, isSuccessful: true, ipAddress: '172.16.0.10', country: 'UAE', city: 'Dubai', region: 'Dubai', isp: 'Etisalat', deviceType: 'Tablet', deviceModel: 'iPad Pro', deviceOS: 'iPadOS', browser: 'Safari', browserVersion: '17.2', appVersion: '2.1.0', networkType: 'WiFi', isAuthenticated: false, requestId: 'req-003' },
  { id: 4, timestamp: '2025-04-10T09:15:00Z', userId: 'u10', fullName: 'Hassan Al-Turki', userEmail: 'hassan@email.com', phoneNumber: '+966541234567', userRole: 'Admin', controller: 'Admin', action: 'UpdateCommissionGroup', actionDescription: 'تحديث بيانات مجموعة العمولات "Standard Group"', httpMethod: 'PATCH', route: '/api/Admin/UpdateCommissionGroup', queryString: '', responseStatus: 200, isSuccessful: true, ipAddress: '192.168.1.1', country: 'Saudi Arabia', city: 'Riyadh', region: 'Riyadh Region', isp: 'STC', deviceType: 'Desktop', deviceModel: 'Chrome', deviceOS: 'Windows', browser: 'Chrome', browserVersion: '121.0', appVersion: '2.1.0', networkType: 'WiFi', isAuthenticated: true, requestId: 'req-004' },
  { id: 5, timestamp: '2025-04-10T08:55:00Z', userId: 'u3', fullName: 'Omar Hassan', userEmail: 'omar@email.com', phoneNumber: '+962791234567', userRole: 'User', controller: 'Auth', action: 'SendOtp', actionDescription: 'إرسال كود التحقق (OTP) إلى: omar@email.com', httpMethod: 'POST', route: '/api/Auth/SendOtp', queryString: '', responseStatus: 429, isSuccessful: false, ipAddress: '10.5.0.7', country: 'Jordan', city: 'Amman', region: 'Amman Governorate', isp: 'Orange Jordan', deviceType: 'Mobile', deviceModel: 'Samsung S24', deviceOS: 'Android', browser: 'Chrome', browserVersion: '120.0', appVersion: '2.0.9', networkType: '4G', isAuthenticated: false, requestId: 'req-005' },
  { id: 6, timestamp: '2025-04-09T17:20:00Z', userId: 'u10', fullName: 'Hassan Al-Turki', userEmail: 'hassan@email.com', phoneNumber: '+966541234567', userRole: 'Admin', controller: 'Account', action: 'ReviewAccount', actionDescription: 'مراجعة الحساب: yusuf@payon - مقبول', httpMethod: 'POST', route: '/api/Account/ReviewAccount', queryString: '', responseStatus: 200, isSuccessful: true, ipAddress: '192.168.1.1', country: 'Saudi Arabia', city: 'Riyadh', region: 'Riyadh Region', isp: 'STC', deviceType: 'Desktop', deviceModel: 'Chrome', deviceOS: 'Windows', browser: 'Chrome', browserVersion: '121.0', appVersion: '2.1.0', networkType: 'WiFi', isAuthenticated: true, requestId: 'req-006' },
];

export const MOCK_SERVICE_TYPES: ServiceTypeItem[] = [
  {
    id: 1,
    name: 'Blockchain Integration (XRP/Stellar)',
    description: 'Connect XRP Ledger and Stellar networks for settlement, transfers, and on-chain payments.',
    isActive: true
  },
  {
    id: 2,
    name: 'Virtual Visa/Mastercard Issuance',
    description: 'Issue virtual cards for online payments with programmatic spend controls.',
    isActive: true
  }
];

export const MOCK_COMMISSION_GROUPS: CommissionGroupListDto[] = [
  { id: 1, name: 'Standard Group', description: 'Default commission group for regular users', isActive: true, isDefault: true, createdAt: '2024-12-01T00:00:00Z', accountCount: 8420, commissionCount: 5 },
  { id: 2, name: 'Merchant Group', description: 'Commission group for merchants with reduced fees', isActive: true, isDefault: false, createdAt: '2024-12-15T00:00:00Z', accountCount: 1240, commissionCount: 6 },
  { id: 3, name: 'Premium Group', description: 'VIP users with special commission rates', isActive: true, isDefault: false, createdAt: '2025-01-10T00:00:00Z', accountCount: 340, commissionCount: 5 },
  { id: 4, name: 'Agent Group', description: 'Commission structure for agents', isActive: false, isDefault: false, createdAt: '2025-02-01T00:00:00Z', accountCount: 85, commissionCount: 4 },
];

export const MOCK_COMMISSIONS: CommissionDTO[] = [
  { id: 1, transactionTypeId: 1, transactionTypeName: 'Transfer', type: 'Percentage', value: 1.0, minAmount: 0, maxAmount: 10000 },
  { id: 2, transactionTypeId: 2, transactionTypeName: 'Payment', type: 'Percentage', value: 0.5, minAmount: 0, maxAmount: 50000 },
  { id: 3, transactionTypeId: 3, transactionTypeName: 'Exchange', type: 'Fixed', value: 5.0, minAmount: 0, maxAmount: 99999 },
  { id: 4, transactionTypeId: 4, transactionTypeName: 'Merchant Payment', type: 'Percentage', value: 1.5, minAmount: 0, maxAmount: 100000 },
  { id: 5, transactionTypeId: 5, transactionTypeName: 'Refund', type: 'Fixed', value: 0.0, minAmount: 0, maxAmount: 99999 },
];

export const MOCK_LIMIT_TYPES: LimitType[] = [
  { id: 1, type: 'Daily Transfer Limit', description: 'Maximum amount transferable per day', isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 2, type: 'Single Transaction Limit', description: 'Maximum per single transaction', isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 3, type: 'Monthly Limit', description: 'Maximum monthly transfer volume', isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 4, type: 'Receiving Limit', description: 'Maximum amount receivable per day', isActive: false, createdAt: '2025-01-10T00:00:00Z' },
];

export const MOCK_LIMIT_GROUPS: LimitGroup[] = [
  { id: 1, name: 'Basic Limits', description: 'Standard limits for new users', isActive: true, isDefault: true, createdAt: '2024-12-01T00:00:00Z', accountCount: 7840 },
  { id: 2, name: 'Premium Limits', description: 'Elevated limits for verified users', isActive: true, isDefault: false, createdAt: '2025-01-01T00:00:00Z', accountCount: 2100 },
  { id: 3, name: 'Merchant Limits', description: 'High-volume limits for merchants', isActive: true, isDefault: false, createdAt: '2025-01-15T00:00:00Z', accountCount: 650 },
];

export const MOCK_LIMITS: LimitItem[] = [
  { id: 1, limitTypeName: 'Daily Transfer Limit', limitGroupName: 'Basic Limits', value: 5000, isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 2, limitTypeName: 'Single Transaction Limit', limitGroupName: 'Basic Limits', value: 1000, isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 3, limitTypeName: 'Monthly Limit', limitGroupName: 'Basic Limits', value: 50000, isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 4, limitTypeName: 'Daily Transfer Limit', limitGroupName: 'Premium Limits', value: 25000, isActive: true, createdAt: '2025-01-01T00:00:00Z' },
  { id: 5, limitTypeName: 'Single Transaction Limit', limitGroupName: 'Premium Limits', value: 10000, isActive: true, createdAt: '2025-01-01T00:00:00Z' },
  { id: 6, limitTypeName: 'Daily Transfer Limit', limitGroupName: 'Merchant Limits', value: 100000, isActive: true, createdAt: '2025-01-15T00:00:00Z' },
];

export const MOCK_CURRENCIES: CurrencyItem[] = [
  { id: 1, name: 'Saudi Riyal', arName: 'ريال سعودي', code: 'SAR', exchangeRate: 1.0, countryName: 'Saudi Arabia', isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 2, name: 'UAE Dirham', arName: 'درهم إماراتي', code: 'AED', exchangeRate: 0.98, countryName: 'UAE', isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 3, name: 'Jordanian Dinar', arName: 'دينار أردني', code: 'JOD', exchangeRate: 2.65, countryName: 'Jordan', isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 4, name: 'Omani Rial', arName: 'ريال عماني', code: 'OMR', exchangeRate: 9.72, countryName: 'Oman', isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 5, name: 'Kuwaiti Dinar', arName: 'دينار كويتي', code: 'KWD', exchangeRate: 12.25, countryName: 'Kuwait', isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 6, name: 'US Dollar', arName: 'دولار أمريكي', code: 'USD', exchangeRate: 3.75, countryName: 'USA', isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 7, name: 'Turkish Lira', arName: 'ليرة تركية', code: 'TRY', exchangeRate: 0.12, countryName: 'Turkey', isActive: false, createdAt: '2025-01-01T00:00:00Z' },
];

export const MOCK_COUNTRIES: CountryItem[] = [
  { id: 1, name: 'Saudi Arabia', arName: 'المملكة العربية السعودية', iso: 'SA', code: 'SAU', phoneCode: 966, numCode: 682, isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 2, name: 'UAE', arName: 'الإمارات العربية المتحدة', iso: 'AE', code: 'ARE', phoneCode: 971, numCode: 784, isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 3, name: 'Jordan', arName: 'الأردن', iso: 'JO', code: 'JOR', phoneCode: 962, numCode: 400, isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 4, name: 'Oman', arName: 'عُمان', iso: 'OM', code: 'OMN', phoneCode: 968, numCode: 512, isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 5, name: 'Kuwait', arName: 'الكويت', iso: 'KW', code: 'KWT', phoneCode: 965, numCode: 414, isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 6, name: 'Bahrain', arName: 'البحرين', iso: 'BH', code: 'BHR', phoneCode: 973, numCode: 48, isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 7, name: 'Qatar', arName: 'قطر', iso: 'QA', code: 'QAT', phoneCode: 974, numCode: 634, isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 8, name: 'Egypt', arName: 'مصر', iso: 'EG', code: 'EGY', phoneCode: 20, numCode: 818, isActive: true, createdAt: '2024-12-01T00:00:00Z' },
];

export const MOCK_OTP_CODES: OtpCodeItem[] = [
  { id: 1, emailOrPhone: 'ahmed@email.com', isForgotPassword: false, isUsed: true, createdAt: '2025-04-10T08:00:00Z', expiresAt: '2025-04-10T08:02:00Z' },
  { id: 2, emailOrPhone: '+962791234567', isForgotPassword: false, isUsed: false, createdAt: '2025-04-10T08:55:00Z', expiresAt: '2025-04-10T08:57:00Z' },
  { id: 3, emailOrPhone: 'sara@email.com', isForgotPassword: true, isUsed: true, createdAt: '2025-04-09T14:00:00Z', expiresAt: '2025-04-09T14:02:00Z' },
  { id: 4, emailOrPhone: '+966551234567', isForgotPassword: false, isUsed: true, createdAt: '2025-04-09T11:00:00Z', expiresAt: '2025-04-09T11:02:00Z' },
  { id: 5, emailOrPhone: 'yusuf@email.com', isForgotPassword: false, isUsed: false, createdAt: '2025-04-08T16:00:00Z', expiresAt: '2025-04-08T16:02:00Z' },
];

export const MOCK_INVITATION_USERS: InvitationUser[] = [
  { id: 'i1', userName: 'Layla Ibrahim', userEmail: 'layla@email.com', referralCode: 'AHMED2025', referredByName: 'Ahmed Al-Rashid', bonusAmount: 50.00, isPaid: true, createdAt: '2025-04-05T09:00:00Z' },
  { id: 'i2', userName: 'Yusuf Al-Farsi', userEmail: 'yusuf@email.com', referralCode: 'SARA2025', referredByName: 'Sara Mohammed', bonusAmount: 50.00, isPaid: false, createdAt: '2025-04-08T16:00:00Z' },
  { id: 'i3', userName: 'Mariam Qasem', userEmail: 'mariam@email.com', referralCode: 'AHMED2025', referredByName: 'Ahmed Al-Rashid', bonusAmount: 50.00, isPaid: true, createdAt: '2025-02-14T10:30:00Z' },
];

export const MOCK_INVITATION_SETTINGS: InvitationSettings = {
  bonusAmount: 50.00,
  durationInHours: 72,
  description: 'Invite friends and earn 50 SAR when they complete their first transaction.',
  arDescription: 'ادعُ أصدقاءك واربح 50 ريال عند إتمامهم أول معاملة.',
};

export const MOCK_ACCOUNT_TYPES: AccountType[] = [
  { id: 1, type: 'Personal', arType: 'شخصي', description: 'Standard personal account', isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 2, type: 'Business', arType: 'تجاري', description: 'Business/merchant account', isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 3, type: 'Agent', arType: 'وكيل', description: 'Agent account with special privileges', isActive: true, createdAt: '2024-12-01T00:00:00Z' },
  { id: 4, type: 'Admin', arType: 'مدير', description: 'System administrator account', isActive: true, createdAt: '2024-12-01T00:00:00Z' },
];
