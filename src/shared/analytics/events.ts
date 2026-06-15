export const ANALYTICS_EVENTS = {
  welcome_viewed: {
    name: "welcome_viewed",
    description: "Пользователь увидел экран приветствия (первый запуск без кошелька).",
  },
  loading_viewed: {
    name: "loading_viewed",
    description: "Пользователь увидел экран создания кошелька (лоадер после нажатия Create wallet).",
  },
  main_viewed: {
    name: "main_viewed",
    description: "Пользователь увидел главный экран кошелька с балансом и списком активов.",
  },
  deposit_viewed: {
    name: "deposit_viewed",
    description: "Пользователь увидел экран депозита с QR-кодом и адресом выбранной сети.",
  },
  chain_select_sheet_viewed: {
    name: "chain_select_sheet_viewed",
    description: "Пользователь открыл нижнюю панель выбора сети (chain select sheet).",
  },
  create_wallet_clicked: {
    name: "create_wallet_clicked",
    description: "Нажата кнопка Create wallet на экране приветствия.",
  },
  invite_friends_clicked: {
    name: "invite_friends_clicked",
    description: "Нажата кнопка Invite friends в шапке главного экрана.",
  },
  add_funds_clicked: {
    name: "add_funds_clicked",
    description: "Нажата основная синяя кнопка Add funds на главном экране.",
  },
  top_up_clicked: {
    name: "top_up_clicked",
    description: "Нажата кнопка Top up в промо-блоке бонуса на главном экране.",
  },
  deposit_chain_selector_clicked: {
    name: "deposit_chain_selector_clicked",
    description: "Нажат селектор сети на экране депозита (открывает chain select sheet).",
  },
  deposit_copy_address_clicked: {
    name: "deposit_copy_address_clicked",
    description: "Нажата кнопка копирования адреса на экране депозита.",
  },
  chain_select_item_clicked: {
    name: "chain_select_item_clicked",
    description: "Нажата строка сети в chain select sheet (выбор сети).",
  },
  chain_select_qr_clicked: {
    name: "chain_select_qr_clicked",
    description: "Нажата кнопка QR у сети в chain select sheet (переход к депозиту).",
  },
  chain_select_copy_clicked: {
    name: "chain_select_copy_clicked",
    description: "Нажата кнопка копирования адреса у сети в chain select sheet.",
  },
  chain_select_sheet_close_clicked: {
    name: "chain_select_sheet_close_clicked",
    description: "Нажата кнопка закрытия (стрелка назад) в chain select sheet.",
  },
  chain_select_sheet_backdrop_clicked: {
    name: "chain_select_sheet_backdrop_clicked",
    description: "Нажат затемнённый фон (backdrop) для закрытия chain select sheet.",
  },
  telegram_back_clicked: {
    name: "telegram_back_clicked",
    description: "Нажата системная кнопка Назад Telegram (закрытие sheet или возврат с депозита).",
  },
  waitlist_viewed: {
    name: "waitlist_viewed",
    description: "Пользователь увидел экран waitlist (до вступления в лист ожидания).",
  },
  waitlist_joined_viewed: {
    name: "waitlist_joined_viewed",
    description: "Пользователь увидел экран waitlist после вступления в лист ожидания.",
  },
  waitlist_join_clicked: {
    name: "waitlist_join_clicked",
    description: "Нажата кнопка Join waitlist на экране waitlist.",
  },
  waitlist_invite_friends_clicked: {
    name: "waitlist_invite_friends_clicked",
    description: "Нажата кнопка Invite friends на экране waitlist.",
  },
} as const;

export type AnalyticsEventName = keyof typeof ANALYTICS_EVENTS;

export const ANALYTICS_EVENT_NAMES = Object.fromEntries(
  Object.entries(ANALYTICS_EVENTS).map(([key, value]) => [key, value.name]),
) as Record<AnalyticsEventName, AnalyticsEventName>;
