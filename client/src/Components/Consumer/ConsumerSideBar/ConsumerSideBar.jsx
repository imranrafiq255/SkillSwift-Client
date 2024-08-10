import React, { useCallback } from 'react';

const Sidebar = ({ isVisible }) => {
  const onDashboardContainerClick = useCallback(() => {
    console.log("Dashboard container clicked");
  }, []);
  
  const onChatContainerClick = useCallback(() => {
    console.log("Chat container clicked");
  }, []);
  
  const onTaskHistoryContainerClick = useCallback(() => {
    console.log("Task History container clicked");
  }, []);

  return (
    <div
      className={`w-[17.5rem] bg-[#2b3445] flex flex-col items-end justify-start pt-[0.937rem] px-[0rem] pb-[22.375rem] box-border gap-[0.937rem] z-[2] ${
        isVisible ? 'block' : 'hidden'
      } mq750:pb-[9.438rem] mq750:box-border mq1100:hidden mq1100:pt-[1.25rem] mq1100:pb-[14.563rem] mq1100:box-border`}
    >
      <div className="w-[16.563rem] flex flex-row items-start justify-end py-[0rem] px-[1rem] box-border">
        <div className="flex-1 flex flex-row items-start justify-between gap-[1.25rem]">
          <div className="w-[8.375rem] flex flex-col items-start justify-start pt-[0.812rem] px-[0rem] pb-[0rem] box-border">
            <img
              className="self-stretch h-[0.863rem] relative max-w-full overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="/group-4.svg"
            />
          </div>
          <img
            className="h-[2.5rem] w-[2.5rem] relative rounded-[20px] overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/svg.svg"
          />
        </div>
      </div>
      <div className="self-stretch h-[37.25rem] overflow-y-auto shrink-0 flex flex-col items-start justify-start pt-[1.25rem] px-[1rem] pb-[4.625rem] box-border gap-[10.125rem] mq1100:pb-[3rem] mq1100:box-border mq450:gap-[5.063rem] mq450:pb-[1.938rem] mq450:box-border">
        <div className="self-stretch flex flex-col items-start justify-start gap-[1.375rem] shrink-0">
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.625rem]">
            <div className="flex flex-row items-start justify-start py-[0rem] px-[0.937rem]">
              <div className="text-white relative leading-[1.313rem] uppercase font-semibold inline-block min-w-[3.063rem]">{`Consumer `}</div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[0.625rem] text-center text-[0.875rem]">
              <div
                className="self-stretch rounded-[8px] border-[rgba(255,255,255,0.05)] border-[1px] border-solid flex flex-row items-start justify-start py-[0.562rem] px-[1rem] gap-[0.812rem] cursor-pointer"
                onClick={onDashboardContainerClick}
              >
                <img
                  className="h-[1.375rem] w-[1.375rem] relative overflow-hidden shrink-0 object-cover min-h-[1.375rem]"
                  alt=""
                  src="/svg-2@2x.png"
                />
                <div className="w-[4.438rem] flex flex-col items-start justify-start pt-[0.062rem] px-[0rem] pb-[0rem] box-border">
                  <div className="text-white self-stretch relative inline-block min-w-[4.438rem]">
                    Dashboard
                  </div>
                </div>
              </div>
              <div
                className="self-stretch rounded-[8px] border-[rgba(255,255,255,0.05)] border-[1px] border-solid flex flex-row items-start justify-start py-[0.562rem] px-[1rem] gap-[0.812rem] cursor-pointer"
                onClick={onChatContainerClick}
              >
                <img
                  className="h-[1.375rem] w-[1.375rem] relative overflow-hidden shrink-0 object-cover min-h-[1.375rem]"
                  alt=""
                  src="/svg-2@2x.png"
                />
                <div className="w-[4.438rem] flex flex-col items-start justify-start pt-[0.062rem] px-[0rem] pb-[0rem] box-border">
                  <div className="text-white self-stretch relative inline-block min-w-[4.438rem]">
                    Chats
                  </div>
                </div>
              </div>
              <div
                className="self-stretch rounded-[8px] border-[rgba(255,255,255,0.05)] border-[1px] border-solid flex flex-row items-start justify-start py-[0.562rem] px-[1rem] gap-[0.812rem] cursor-pointer"
                onClick={onTaskHistoryContainerClick}
              >
                <img
                  className="h-[1.375rem] w-[1.375rem] relative overflow-hidden shrink-0 min-h-[1.375rem]"
                  alt=""
                  src="/svg-3.svg"
                />
                <div className="w-[5.563rem] flex flex-col items-start justify-start pt-[0.062rem] px-[0rem] pb-[0rem] box-border">
                  <div className="text-white self-stretch relative inline-block min-w-[5.563rem]">
                    Task History
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
