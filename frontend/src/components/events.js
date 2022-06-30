let eventDetails = {
  eventFinalized: false,
  carpoolEnabled: true,
  totalResponded: 0,
  timeSlots: ["01/12/22", "05/01/22", "06/12/22"],
  invitees: [
    {
      userId: 1,
      hasResponded: false,
      isAttending: false,
      carpoolStatus: "none",
      availability: [],
      filters: {
        // distanceLevel: 1,
        priceLevel: 2,
        extendedPreferences: {
          likes: [],
          dislikes: [],
        },
      },
    },
    {
      userId: 2,
      hasResponded: false,
      isAttending: false,
      carpoolStatus: "none",
      availability: ["01/12/22", "05/01/22", "06/12/22"],
      filters: {
        // distanceLevel: 1,
        priceLevel: 2,
        extendedPreferences: {
          likes: [],
          dislikes: [],
        },
      },
    },
    {
      userId: 3,
      hasResponded: false,
      isAttending: false,
      carpoolStatus: "driver",
      availability: ["01/12/22", "05/01/22", "06/12/22"],
      filters: {
        // distanceLevel: 1,
        priceLevel: 2,
        extendedPreferences: {
          likes: [],
          dislikes: [],
        },
      },
    },
  ],
};

export default eventDetails;
