"use client";

import { useEffect, useState } from "react";
import { Select, Switch } from "@headlessui/react";
import Pagination from "@/components/PaginationToolbar";
import {
  changePostPermission,
  changeUserBan,
  changeUserRole,
  getAllUsers,
} from "@/app/actions/admin";
import { DocumentData } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { getPostPermission } from "@/app/actions/posts";

export default function UsersManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [postingPermission, setPostingPermission] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleRoleChange = async (userId: string, newRole: string) => {
    await changeUserRole(userId, newRole);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.uid === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleBanChange = async (userId: string, isBanned: boolean) => {
    await changeUserBan(userId, !isBanned);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.uid === userId ? { ...user, isBanned: !isBanned } : user
      )
    );
  };

  const handlePostPermission = async (roles: string) => {
    await changePostPermission(roles);
    setPostingPermission(roles);
  };

  useEffect(() => {
    const fetchSettings = async () => {
      const postingSettings = await getPostPermission();
      if (postingSettings?.canPost.length === 3) {
        setPostingPermission("all");
      } else if (postingSettings?.canPost.length === 2) {
        setPostingPermission("editors");
      } else if (postingSettings?.canPost.length === 1) {
        setPostingPermission("admins");
      }
    };
    const fetchUsers = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData ?? []);
      setIsLoading(false);
    };
    fetchSettings();
    fetchUsers();
  });

  return (
    <div className="mx-auto mb-10 max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      <h1 className="mt-10 text-center text-2xl font-semibold">
        Users Management
      </h1>
      {isLoading ? (
        <>
          <span className="sr-only"></span>
          <Loader2 className="text-primary mx-auto mt-20 size-40 animate-spin" />
        </>
      ) : (
        <>
          <div className="pt-3 pb-6">
            <h2 className="mb-4 text-lg font-medium">Posting Permissions</h2>
            <div className="flex items-center space-x-3">
              <span className="text-sub-foreground shrink-0 text-sm">
                Who can post:
              </span>
              <Select
                value={postingPermission}
                onChange={(e) => handlePostPermission(e.target.value)}
                className="bg-background-800 text-foreground mt-1 block w-full max-w-3xl rounded-md border-2 border-gray-300 py-2 pr-10 pl-3 text-base focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
              >
                <option value="all">All Users</option>
                <option value="editors">Editors and Admins</option>
                <option value="admins">Admins Only</option>
              </Select>
            </div>
          </div>
          <div className="w-full overflow-hidden rounded-md shadow-md">
            <div className="min-w-full overflow-x-auto">
              <table className="divide-background-200 w-full min-w-[600px] divide-y">
                <thead className="bg-background-600 text-sub-foreground">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                      Role
                    </th>
                    <th className="py-3 pr-3 pl-6 text-left text-xs font-medium tracking-wider uppercase">
                      Banned
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-background-800 divide-background-200 divide-y">
                  {currentUsers.map((user) => (
                    <tr key={user.uid}>
                      <td className="text-foreground px-6 py-4 text-sm font-medium whitespace-nowrap">
                        {`${user.firstName} ${user.lastName}`}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {user.email ?? "-"}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        <Select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user.uid, e.target.value)
                          }
                          className="bg-background-800 text-foreground mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                        >
                          <option value="user">User</option>
                          <option value="editor">Editor</option>
                          <option value="admin">Admin</option>
                        </Select>
                      </td>
                      <td className="py-4 pl-6 text-sm whitespace-nowrap text-gray-500">
                        <Switch
                          checked={user.isBanned}
                          onChange={() =>
                            handleBanChange(user.uid, user.isBanned)
                          }
                          className={`${
                            user.isBanned ? "bg-red-600" : "bg-gray-400"
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span className="sr-only">User Banned</span>
                          <span
                            className={`${
                              user.isBanned ? "translate-x-6" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white`}
                          />
                        </Switch>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
