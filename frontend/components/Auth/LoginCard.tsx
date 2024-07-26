'use client';

import React from "react";
import ProviderButton from "../Button/ProviderButton";
import Google from "../Provider/Google";
import Facebook from "../Provider/Facebook";
import Microsoft from "../Provider/Microsoft";
import PrimaryButton from "../Button/PrimaryButton";

const LoginCard = () => {
  return (
    <div className="border grid flex-col gap-y-4 p-10 shadow-md rouned-lg">
      <ProviderButton className="bg-sky-600" icon={<Google />}>
        Continue with google
      </ProviderButton>
      <ProviderButton className="bg-blue-600" icon={<Facebook />}>
        Continue with Facebook
      </ProviderButton>
      <ProviderButton className="bg-slate-900" icon={<Microsoft />}>
        Continue with Microsoft
      </ProviderButton>
      <div className="flex justify-center items-center my-4">
        <div className="border-t border-gray-300 flex-grow mr-3"></div>
        <span className="flex-shrink">OR</span>
        <div className="border-t border-gray-300 flex-grow ml-3"></div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm">
          <span className="absolut left-0 top-0 mr-1">*</span>Email
          (required)
        </label>
        <input type="text" className="p-2 border bg-orange-50 rounded-lg" />
      </div>
      <div className="flex justify-center">
        <PrimaryButton onClick={() => {}} size="lg" disabled={true}>
          Continue
        </PrimaryButton>
      </div>
      <div>
        <p className="font-normal text-xs">
          Don{"'"}t have a Zapier account yet?
          <span className="text-blue-500 underline">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginCard;
