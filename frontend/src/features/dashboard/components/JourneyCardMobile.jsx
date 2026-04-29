export default function JourneyCardMobile({ languages }) {
  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[22px] font-bold text-gray-900 tracking-tight">Your Journey</h3>
        <div className="bg-[#DCFCE7] text-[#059669] px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#BBF7D0]">
          <span className="text-sm font-bold">✦</span>
          <span className="text-[13px] font-bold">12 credits</span>
        </div>
      </div>

      {/* Horizontal Flex Row
          - px-1 added to container so cards don't touch the very edge when scrolling
          - snap-x for that "app-like" feel
      */}
      <div className="flex flex-row gap-3 overflow-x-auto pb-4 px-1 scrollbar-hide snap-x">
        {languages.map((lang) => (
          <div 
            key={lang.name} 
            className="
              /* STRATEGY: 
                 Set a minimum width that guarantees text readability (165px).
                 But also allow it to be 50% on slightly larger mobile screens.
              */
              min-w-[165px]
              w-[calc(50%-6px)] 
              flex-none 
              bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm 
              flex items-center gap-3 snap-start
            "
          >
            {/* Icon Circle */}
            <div 
              className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-base" 
              style={{ backgroundColor: lang.color }}
            >
              <span style={{ color: lang.iconColor }}>文</span>
            </div>

            <div className="flex flex-col min-w-0">
              <p className="text-[9px] uppercase text-gray-400 font-extrabold tracking-widest mb-0.5">
                LEARNING
              </p>
              <p className="font-bold text-gray-900 text-[15px] leading-tight truncate">
                {lang.name}
              </p>
              <p className="text-[11px] text-gray-400 font-medium truncate">
                {lang.level}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}