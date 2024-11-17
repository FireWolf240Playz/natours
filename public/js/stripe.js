import axios from "axios";
import { showAlert } from "./alerts";

const stripe = Stripe(
  "pk_test_51QLjnMG7eoAc1MPU8YsECxHGUzxOB17ccEf3MvDOn55QJOld7w3ZbrIp85hmmNPpoW2vxsiYxeyc1WyUTfiYJnWX006ejTcq9X",
);

export const bookTour = async (tourId) => {
  //1) Get checkout session from API
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert("error", err);
  }

  //2) Create checkout form + charge credit card
};
