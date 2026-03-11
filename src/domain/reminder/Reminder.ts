export type ReminderChannel = 'sms' | 'email' | 'push'

export type Reminder = {
  contactId: string
  daysAhead: number
  channel: ReminderChannel
}
