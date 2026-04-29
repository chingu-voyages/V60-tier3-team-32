import JourneyCardDesktop from "./JourneyCardDesktop";
import JourneyCardMobile from "./JourneyCardMobile";

export default function JourneyCard(props) {
  return (
    <>
      {/* Show Mobile version up to Large screens */}
      <div className="lg:hidden">
        <JourneyCardMobile {...props} />
      </div>

      {/* Show Desktop version only on Large screens and up */}
      <div className="hidden lg:block">
        <JourneyCardDesktop {...props} />
      </div>
    </>
  );
}