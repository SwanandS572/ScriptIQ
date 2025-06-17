"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import moment from 'moment';

function Billing() {
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const createSubscription = () => {
    setLoading(true);
    axios.post('/api/history/create-subscription', {})
      .then((resp: any) => {
        console.log(resp.data);
        onPayment(resp.data.id);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  };

  const onPayment = (subId: string) => {
    const options = {
      "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      "subscription_id": subId,
      "name": 'AI Content Generator',
      "description": 'Monthly Subscription',
      "handler": async (resp: any) => {
        console.log(resp);
        if (resp) {
          saveSubscription(resp?.razorpay_payment_id);
        }
        setLoading(false);
      }
    };

    const saveSubscription = async (paymentId: string) => {
      const result = await db.insert(UserSubscription)
        .values({
          email: user?.user?.primaryEmailAddress?.emailAddress,
          userName: user?.user?.fullName,
          active: true,
          paymentId: paymentId,
          joinDate: moment().format('DD/MM/yyyy')
        });

      console.log(result);
      if (result) {
        window.location.reload();
      }
    };

    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h2 className='text-center font-semibold text-3xl my-6'>Upgrade With Monthly Plan</h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-stretch">
          <div className="rounded-2xl bg-white border border-gray-200 p-8 shadow-sm">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Free
              </h2>
              <p className="mb-6">
                <strong className="text-4xl font-semibold text-gray-900">0$</strong>
                <span className="text-sm font-normal text-gray-600 ml-1">/month</span>
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-green-600 flex-shrink-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 font-normal">10,000 Words/Month</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-green-600 flex-shrink-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 font-normal">50+ Content Templates</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-green-600 flex-shrink-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 font-normal">Unlimited Download & Copy</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-green-600 flex-shrink-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 font-normal">1 Month of History</span>
              </li>
            </ul>

            <button
              disabled
              className="w-full rounded-full bg-gray-500 text-white py-3 px-6 text-sm font-normal cursor-not-allowed"
            >
              Currently Active Plan
            </button>
          </div>

          <div className="rounded-2xl bg-white border border-gray-200 p-8 shadow-sm">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Monthly
              </h2>
              <p className="mb-6">
                <strong className="text-4xl font-semibold text-gray-900">9.99$</strong>
                <span className="text-sm font-normal text-gray-600 ml-1">/month</span>
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-green-600 flex-shrink-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 font-normal">1,00,000 Words/Month</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-green-600 flex-shrink-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 font-normal">50+ Template Access</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-green-600 flex-shrink-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 font-normal">Unlimited Download & Copy</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-green-600 flex-shrink-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-gray-700 font-normal">1 Year of History</span>
              </li>
            </ul>

            <button
              disabled={loading}
              onClick={createSubscription}
              className="w-full rounded-full border border-purple-600 text-purple-600 hover:bg-purple-50 py-3 px-6 text-sm font-normal flex items-center justify-center gap-2 transition-colors"
            >
              {loading && <Loader2 className='animate-spin w-4 h-4' />}
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;