import ClockText from "@/components/ClockText";
import ClockStatus from "@/components/ClockStatus";
import ClockControls from "@/components/ClockControls";

// import useSound from "use-sound";
// import chimeURL from "@/assets/Sounds/chime.mp3";
// import changeModeURL from "@/assets/Sounds/changemode.mp3";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Stopwatch = () => {
  // const [playChangeMode] = useSound(changeModeURL, { volume: 0.5 });
  // const [playChime] = useSound(chimeURL, { volume: 0.5 });

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center text-3xl'>FLOWMODORO</CardTitle>
      </CardHeader>

      <CardContent>
        <ClockStatus />
        <ClockText />
        <ClockControls />
      </CardContent>
    </Card>
  );
};

export default Stopwatch;
