"use client";

import SubTableItem from "@/Components/AdminComponents/SubTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    const response = await axios.get("/api/email");
    setEmails(response.data.emails);
    console.log(response.data.emails);
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const onDelete = async (emailId) => {
    try {
      const response = await axios.delete("/api/email", {
        params: {
          id: emailId,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchEmails();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Subscriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscription{" "}
              </th>
              <th scope="col" className="px-6 py-3 hidden sm:block">
                Date{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                Action{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item, index) => (
              <SubTableItem
                key={item._id}
                mongoId={item._id}
                email={item.email}
                date={item.date}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
