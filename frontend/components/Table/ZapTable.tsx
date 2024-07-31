import Link from "next/link";
import React from "react";

interface ZapsProps {
  id: string;
  triggerId: string;
  userId: number;
  trigger: {
    id: string;
    zapId: string;
    triggerId: string;
    type: {
      id: string;
      name: string;
    };
  };
  actions: [
    {
      id: string;
      zapId: string;
      actionId: string;
      type: {
        id: string;
        name: string;
      };
    },
    {
      id: string;
      zapId: string;
      actionId: string;
      type: {
        id: string;
        name: string;
      };
    }
  ];
}

const ZapTable = ({ zaps }: { zaps: ZapsProps[] }) => {
  console.log(" zaps : ", zaps);
  return (
    <div className="flex justify-center w-full pt-10">
      <div className="relative overflow-x-auto max-w-screen-lg w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.no
              </th>
              <th scope="col" className="px-6 py-3">
                Triggers
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
              <th scope="col" className="px-6 py-3">
                Running
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b ">
              {zaps.map((zap, index) => {
                return (
                  <>
                  <td className="px-6 py-4">{index+1}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {zap.trigger.triggerId}
                    </th>
                    <td className="px-6 py-4">{zap.actions.map((action) => (action.actionId) + ("  "))}</td>
                    
                    <td className="px-6 py-4">
                        <Link className="hover:bg-gray-300 p-2" href={`/zap/${zap.id}`}>{" > "}</Link>
                    </td>
                  </>
                );
              })}
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ZapTable;
