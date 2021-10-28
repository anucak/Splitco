const ROUTES = {
  homePageRoute: () => "/",
  newEventRoute: () => "/events/new",
  eventRoute: (eventId) => `/events/${eventId}`,
  editEventRoute: (eventId) => `/events/${eventId}/edit`,
  eventsRoute: () => "/events",
  newPersonRoute: (eventId) => `/events/${eventId}/people/new`,
  personRoute: (eventId, personId) => `/events/${eventId}/people/${personId}`,
  peopleRoute: (eventId) => `/events/${eventId}/people`,
  newExpenseRoute: (eventId) => `/events/${eventId}/expenses/new`,
  expenseRoute: (eventId, expenseId) => `/events/${eventId}/expenses/${expenseId}`,
  expensesRoute: (eventId) => `/events/${eventId}/expenses`,
  suggestPaymentsRoute: (eventId) => `/events/${eventId}/how-to-settle-up`
};

export default ROUTES;