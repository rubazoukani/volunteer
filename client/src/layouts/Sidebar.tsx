import React, { useState } from 'react'
import { useAppContext } from '../context/AppProvider'
import { cn, isCurrentPage } from '../misc/helpers'
import { FaBars, FaUser } from 'react-icons/fa'
import logo from "../assets/logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { logout } from '../api-client'
import { Button } from 'react-bootstrap'

const Sidebar = (): React.JSX.Element => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false)

  const { user, showToast } = useAppContext()
  const queryClient = useQueryClient()
  const navigator = useNavigate()

  const logoutMutation = useMutation(logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({
        message: "Logging out successfully",
        type: "SUCCESS",
      });
      navigator("/login");
    },
    onError: () => {
      showToast({
        message: "Logging out failed",
        type: "ERROR",
      });
    },
  });

  const logoutHandle = () => logoutMutation.mutate();

  const sidebarButtonClickingHandling = () => {
    setIsSidebarVisible(prev => !prev)
  }

  return (
    <aside id='sidebar' className={cn(
      isSidebarVisible,
      "visible",
      null,
      "sidebar transition-03")}
    >
      <div className={cn(
        isSidebarVisible,
        "visible",
        null,
        "content bg-third h-100 px-1 flex-center-y flex-column flex-1 transition-03e"
      )}>
        <div className="logo w-100 py-4 px-2 flex-center-y gap-2 border-bottom border-secondary">
          <img src={logo} alt="logo" width={30} height={30} className='bg-white p-1 rounded-circle' />
          <p className='m-0 text-white fs-5'>Volunteer</p>
        </div>

        <div className="profile w-100 py-3 px-2 flex-center-y gap-2 border-bottom border-secondary">
          <FaUser fontSize={30} className='bg-white p-1 rounded-circle' />
          <div className='ms-1 lh-sm'>
            <p className='m-0 text-white fs-6'>{user.username}</p>
            <span className='fs-sm text-white-50'>{user.role}</span>
          </div>
        </div>

        <div className='w-100 py-2 d-flex flex-column gap-2 flex-1'>
          <Link
            to="/profile"
            className={cn(
              isCurrentPage("/profile"),
              "bg-main text-white",
              "bg-second-hover text-white transition-03",
              "w-100 py-2 px-3 rounded-2 text-decoration-none fw-semibold"
            )}
          >
            Profile
          </Link>

          <Link
            to="/chances"
            className={cn(
              isCurrentPage("/chances"),
              "bg-main text-white",
              "bg-second-hover text-white transition-03",
              "w-100 py-2 px-3 rounded-2 text-decoration-none fw-semibold"
            )}
          >
            Chances
          </Link>

          {
            user.role === "admin" &&
            <>
              <Link
                to="/volunteers"
                className={cn(
                  isCurrentPage("/volunteers"),
                  "bg-main text-white",
                  "bg-second-hover text-white transition-03",
                  "w-100 py-2 px-3 rounded-2 text-decoration-none fw-semibold"
                )}
              >
                Volunteers
              </Link>
              <Link
                to="/organizations"
                className={cn(
                  isCurrentPage("/organizations"),
                  "bg-main text-white",
                  "bg-second-hover text-white transition-03",
                  "w-100 py-2 px-3 rounded-2 text-decoration-none fw-semibold"
                )}
              >
                Organizations
              </Link>
              <Link
                to="/pending-organizations"
                className={cn(
                  isCurrentPage("/pending-organizations"),
                  "bg-main text-white",
                  "bg-second-hover text-white transition-03",
                  "w-100 py-2 px-3 rounded-2 text-decoration-none fw-semibold"
                )}
              >
                Pending Organizations
              </Link>
            </>
          }
        </div>

        <div className="px-2 pb-3">
          <Button
            onClick={logoutHandle}
            variant="danger"
          >
            Logout
          </Button>
        </div>

        <div
          onClick={sidebarButtonClickingHandling}
          className="toggle-button bg-third p-1 flex-center d-lg-none rounded-end-1 text-white text-main-hover position-absolute transition-03 pointer">
          <FaBars size={20} />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar