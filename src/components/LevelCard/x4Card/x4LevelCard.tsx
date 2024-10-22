'use client';
import { useRouter } from 'next/navigation';
import { FaUsers, FaSyncAlt, FaCoins } from 'react-icons/fa'; // FontAwesome for icons
interface LevelCardProps {
  level: number;
  cost: number;
  partners: number;
  cycles: number | null; // Allow cycles to be null initially
  partnersCount: number; // Number of partners for level
}
const LevelCard: React.FC<LevelCardProps> = ({ level, cost, partners, cycles, partnersCount }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/retro/levelslider/x4slider?level=${level}&cost=${cost}&partners=${partners}&cycles=${cycles}`);
  };
  // Generate 6 partner circles (2 on top, 4 on bottom)
  const renderPartnerCircles = () => {
    const circles = [];
    // First row (2 spots)
    for (let i = 0; i < 2; i++) {
      circles.push(
        <div
          key={`top-${i}`}
          className={`w-10 h-10 rounded-full ${i < partnersCount ? 'bg-blue-500' : 'bg-gray-400'}`} // Blue if i < partnersCount, else gray
        ></div>
      );
    }
    // Second row (4 spots)
    for (let i = 2; i < 6; i++) {
      circles.push(
        <div
          key={`bottom-${i}`}
          className={`w-10 h-10 rounded-full ${i < partnersCount ? 'bg-blue-500' : 'bg-gray-400'}`} // Blue if i < partnersCount, else gray
        ></div>
      );
    }
    return (
      <div className="flex flex-col items-center space-y-2">
        {/* Top row (2 spots) */}
        <div className="flex space-x-2">
          {circles.slice(0, 2)} {/* Display the first 2 circles */}
        </div>
        {/* Bottom row (4 spots) */}
        <div className="flex space-x-2">
          {circles.slice(2, 6)} {/* Display the remaining 4 circles */}
        </div>
      </div>
    );
  };
  return (
    <div
      className="bg-blue-600 p-4 rounded-lg text-white text-center border border-blue-500 shadow-lg relative cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={handleClick}
    >
      <div className="absolute top-2 right-2 text-yellow-300">
        <FaCoins className="inline mr-1" /> {cost}
      </div>
      <div className="flex justify-between mb-4">
        <div className="text-lg font-semibold">Lvl {level}</div>
      </div>
      {/* Render partner circles (2 on top, 4 on bottom) */}
      <div className="flex justify-center my-6">
        {renderPartnerCircles()}
      </div>
      <div className="flex justify-between text-sm mt-6">
        <div className="flex items-center">
          <FaUsers className="mr-2" /> {partners}
        </div>
        <div className="flex items-center">
          <FaSyncAlt className="mr-2" /> {cycles !== null ? cycles : 'Loading...'}
        </div>
      </div>
    </div>
  );
};
export default LevelCard;