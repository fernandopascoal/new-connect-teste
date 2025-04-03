export enum PixwayAppRoutes {
    HOME = '/',
    DASHBOARD = '/dashboard',
    ABOUT = '/about',
    TEAMS = '/teams',
    MARKETPLACE = '/marketplace',
    FAQ = '/faq',
    SIGN_UP = '/auth/signUp',
    SIGN_IN = '/auth/signIn',
    CONNECT_EXTERNAL_WALLET = '/auth/completeSignup/connectExternalWallet',
    REQUEST_PASSWORD_CHANGE = '/auth/changePassword/request',
    SIGN_UP_MAIL_CONFIRMATION = '/auth/verify-sign-up',
    MY_PROFILE = '/profile',
    RESET_PASSWORD = '/auth/changePassword/newPassword',
    TOKEN_DETAILS = '/tokens/{contractAddress}/{chainId}/{tokenId}',
    TOKENS = '/tokens',
    TOKENS_CLIENTS = '/tokens/clients',
    TOKENPASS = '/tokens/pass',
    TOKENPASS_DETAIL = '/tokens/pass/{tokenPassId}',
    TOKENPASS_CLIENTS = '/tokens/pass/client',
    TOKENPASS_REPORT = '/tokens/pass/repor',
    CHECKOUT_CONFIRMATION = '/checkout/confirmation',
    CHECKOUT_CART_CONFIRMATION = '/checkout/cart/confirmation',
    CHECKOUT_PAYMENT = '/checkout/payment',
    CHECKOUT_PROCESSING = '/checkout/processing',
    CHECKOUT_COMPLETED = '/checkout/completed',
    MY_TOKENS = '/wallet',
    WALLET_RECEIPT = '/wallet/statement',
    SETTINGS = '/settings',
    HELP = '/help',
    TOKEN_PUBLIC = '/token/{contractAddress}/{chainId}/{tokenId}',
    TOKEN_PUBLIC_RFID = '/token/rfid/{rfid}',
    CONTACT_US = '/contact-us',
    TERMS_CONDITIONS = '/terms-and-conditions',
    PRIVACY_POLICY = '/privacy-policy',
    CONFIG = '/configurations',
    COMPLETE_SIGNUP = '/auth/complete-profile',
    ADD_FUNDS_TYPE = '/addFunds/type',
    ADD_FUNDS_MANUAL = '/addFunds/type/manual',
    VERIfY_WITH_CODE = '/auth/verify-sign-up/code',
    LIST_BENEFITS = '/tokens/{contractAddress}/{chainId}/{tokenId}/list-benefits',
    CONNECTION = '/connection',
    USE_BENEFIT = '/tokens/use-benefit/{benefitId}',
    BENEFIT_DETAILS = '/tokens/benefit-details/{benefitId}',
    COMPLETE_KYC = '/auth/complete-kyc',
    MY_ORDERS = '/profile/orders',
    PRODUCT_PAGE = '/item/{slug}',
    LOYALTY_PAYMENT = '/business/loyalty/payment',
    LOYALTY_REPORT = '/business/loyalty/report',
    AFFILIATES = '/affiliates',
    SIGNIN_WITH_CODE = '/auth/signIn/code',
    COMPLETE_KYC_CONFIRMATION = '/auth/complete-kyc/confirmation',
    WALLET_FUTURE = '/wallet/statement/future',
    CARDS = '/profile/cards',
    WITHDRAWS = '/withdraws',
    WITHDRAWS_ADMIN = '/withdraws/admin',
    REQUESTS = '/requests',
    CHECKOUT_FORM = '/checkout/form',
    STAKING = '/staking',
  }
  