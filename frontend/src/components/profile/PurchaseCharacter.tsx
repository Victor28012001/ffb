/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { ImageWrap } from "../atom/ImageWrap";
import { Text } from "../atom/Text";
import Img1 from "../../assets/img/Rhyno.png";
import Img2 from "../../assets/img/Dragon.png";
import Img3 from "../../assets/img/Godzilla.png";
import Img4 from "../../assets/img/Hound.png";
import Img5 from "../../assets/img/KomodoDragon.png";
import Img6 from "../../assets/img/IceBeever.png";
import Img7 from "../../assets/img/Fox.png";
import Img8 from "../../assets/img/komodo.png";
import { Button } from "../atom/Button";
import { useState } from "react";
import { HiOutlineArrowPath } from "react-icons/hi2";
import charactersdata from '../../utils/Charactersdata';
// import { useActiveAccount } from "thirdweb/react";
// import readGameState from "../../utils/readState.js"
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import signMessages from "../../utils/relayTransaction"
// import { useProfileContext } from "../contexts/ProfileContext.js";
// import fetchNotices from '../../utils/readSubgraph';
// import readGameState from "../../utils/readState";

interface Character {
  id: number;
  name: string;
  health: number;
  strength: number;
  attack: number;
  speed: number;
  super_power: string;
  price: number;
  img: string;
}

// Define the ProfileData type
interface ProfileData {
  monika: string;
  wallet_address: string;
  avatar_url: string;
  characters: string;
  id: number;
  points: number;
  // Add other properties if needed
}





const PurchaseCharacter = () => {
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [totalCharacterPrice, setTotalCharacterPrice] = useState<number>(0);
  // const [submitClicked, setSubmitClicked] = useState(false);
  const [selectedCharactersId, setSelectedCharactersId] = useState<number[]>([]);
  // const navigate = useNavigate();
  // const activeAccount = useActiveAccount()?.address;
  const [profileData] = useState<ProfileData | null>(null);
  const characters = charactersdata;
  // const {profile, setProfile} = useProfileContext();
  const [submiting, setSubmiting] = useState<boolean>(false);



//   useEffect(() => {
//     async function SetUp() {

//       if (activeAccount?.toLowerCase() != profile?.wallet_address?.toLowerCase()) {   
//         try {
//           let request_payload = await fetchNotices("all_profiles");
//           request_payload = request_payload.filter((player: any) => player.wallet_address == activeAccount?.toLowerCase());
//           if (request_payload.length > 0){
//             setProfile(request_payload[0]);
//           } else {
//             navigate('/profile');
//           }
//         } catch (e) {
//           navigate('/profile');
//         console.log(e);
//     }
//   } else {
//     setProfileData(profile);
//     console.log("characters ==", getArrayLength(profile?.characters as string));
//   }
// }

// SetUp();
  
//   }, [location]);

//   function getArrayLength(jsonString: string): number | null {
//     try {
//         // Parse the JSON string to an array of objects
//         const array: { char_id: number }[] = JSON.parse(jsonString);
        
//         // Check if the parsed result is indeed an array
//         if (Array.isArray(array)) {
//             // Return the length of the array
//             return array.length;
//         } else {
//             throw new Error('Parsed result is not an array');
//         }
//     } catch (error: any) {
//         console.error('Error parsing JSON string:', error.message);
//         return null;
//     }
// }

  const toggleCharacterSelection = (character: Character) => {
    const index = selectedCharacters.findIndex((c) => c.id === character.id);
    if (index < 0) {
      if (selectedCharacters.length < 3) {
        //check that total price is not greater than 1050
        if (totalCharacterPrice + character.price > 1050) {
          toast.error("You've exceeded max points: 1050 points", {
            position: "top-right",
          });
          return;
        }
        setSelectedCharacters([...selectedCharacters, character]);
        setSelectedCharactersId([...selectedCharactersId, character.id]);
        setTotalCharacterPrice(character.price + totalCharacterPrice);
        console.log(selectedCharactersId)

      } else {
        toast.error("You can select only 3 characters.", {
          position: "top-right",
        });
      }
    } else {
      const updatedCharacters = [...selectedCharacters];
      const updatedCharactersId = [...selectedCharactersId];
      updatedCharacters.splice(index, 1);
      updatedCharactersId.splice(index, 1);

      setSelectedCharacters(updatedCharacters);
      setSelectedCharactersId(updatedCharactersId);
      setTotalCharacterPrice(totalCharacterPrice - character.price);
    }
  };

  const handleReset = () => {
    setSelectedCharacters([]);
    setTotalCharacterPrice(0);
    setSelectedCharactersId([]);
  };

  const handlePurchaseCharacter = async (e: any) => {
    e.preventDefault();
    interface MessageData {
      func: string; // Function name
      data: {       // Object that contains relevant purchase information
          char_id1: number; // First character ID
          char_id2: number; // Second character ID
          char_id3: number; // Third character ID
          // Add additional fields if needed
      };
  }
  
  // Main logic to check character selection and create the data object
  if (selectedCharactersId.length < 3) {
      toast.error("You must select 3 characters.", {
          position: "top-right",
      });
      return;
  } else {
      console.log("selected ids are: ", selectedCharactersId);
      setSubmiting(true);
  
      const dataObject: MessageData = {
          func: "purchase_team",
          data: { // Wrapping existing properties in a 'data' object
              char_id1: (selectedCharactersId[0] - 1),
              char_id2: (selectedCharactersId[1] - 1),
              char_id3: (selectedCharactersId[2] - 1),
          },
      };
  
      console.log("data Obj", dataObject);
      // const txhash = await signMessages(dataObject); // Now the payload is structured correctly
  
      // Check if txhash is valid before proceeding
      // if (txhash) {
      //     console.log("tx hash is: ", txhash);
      //     await delay(2000);
  
      //     // const { Status, request_payload } = await readGameState(`profile/${activeAccount}`); // Call your function
      //     // if (Status && JSON.parse(request_payload.characters).length > 0) {
      //     //     setSelectedCharacters([]);
      //     //     setSelectedCharactersId([]);
      //     //     setTotalCharacterPrice(0);
      //     //     setProfileData(request_payload);
      //     //     setProfile(request_payload);
              
      //     //     toast.success("Character(s) purchased successfully!", {
      //     //         position: "top-right",
      //     //     });
      //     //     navigate('/duels');
      //     // } else {
      //     //     toast.error("Something went wrong, please submit again!", {
      //     //         position: "top-right",
      //     //     });
      //     // }
      // } else {
      //     toast.error("Something went wrong, please submit again!", {
      //         position: "top-right",
      //     });
      // }
  }
  
    setSubmiting(false)
  };

  //nebuladuel

  // function shuffleArray(array: typeof charactersdata) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // }

  // function delay(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  return (
    <section className="w-full h-auto bg-bodyBg overflow-y-scroll">
      <main className="w-full lg:py-24 md:py-24 py-24 md:px-6 px-3 flex flex-col items-center gap-4">
        <Text
          as="h2"
          className="font-bold font-belanosima text-center uppercase lg:text-4xl md:text-3xl text-2xl tracking-wide"
        >
          Select players to Purchase!
        </Text>

        <section className=" w-full mt-20 flex flex-row lg:gap-20 md:gap-20 gap-6 relative">
          <main className="w-7/12 flex flex-col gap-4">
            <Text
              as="h3"
              className="font-semibold font-belanosima text-2xl tracking-wide text-center"
            >
              All Players
            </Text>
            <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 md:gap-6 lg:gap-4 md:px-2 lg:px-0 overflow-y-scroll">
              {characters.map((item, index) => (
                <div
                  className={`w-full border ${selectedCharactersId.includes(item.id) ? 'border-myGreen' : 'border-gray-800'} border-gray-800 bg-gray-900 flex flex-col items-center gap-2 cursor-pointer hover:border-myGreen/40 transition-all duration-200 rounded-md p-4`}
                  key={index}
                  onClick={() => toggleCharacterSelection(item)}
                >
                  <ImageWrap
                    image={item.img}
                    className="w-full"
                    alt={item.name}
                    objectStatus="object-contain"
                  />
                  <Text as="h5" className="font-belanosima">
                    {item.name}
                  </Text>
                  <div className="w-full grid grid-cols-2 gap-1">
                    <Text
                      as="span"
                      className="text-gray-500 text-xs font-poppins"
                    >
                      Health: {item.health}
                    </Text>
                    <Text
                      as="span"
                      className="text-gray-500 text-xs font-poppins"
                    >
                      Attack: {item.attack}
                    </Text>
                    <Text
                      as="span"
                      className="text-gray-500 text-xs font-poppins"
                    >
                      Strength: {item.strength}
                    </Text>
                    <Text
                      as="span"
                      className="text-gray-500 text-xs font-poppins"
                    >
                      Speed: {item.speed}
                    </Text>
                  </div>
                  <div>
                    <Text
                      as="span"
                      className="text-[#ffbe18] text-xs text-bold font-poppins"
                    >
                      Price: {item.price}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </main>

          <main className=" w-5/12 flex flex-col items-center gap-6 fixed right-0 pr-2">
            <Text
              as="h5"
              className="font-semibold font-belanosima text-lg md:2xl tracking-wide text-center"
            >
              Selected Players
            </Text>

            <div className="w-full p-5 mb-8 relative md:w-[70%] lg:w-full grid grid-cols-3 md:gap-3 border border-gray-800 bg-gray-900 min-h-[220px] lg:h-fit md:h-fit h-fit rounded-md">
              {selectedCharacters?.map((character) => (
                <div
                  key={character.id}
                  className="w-full bg-gray-900 flex flex-col items-center gap-2 cursor-pointer hover:border-myGreen/40 transition-all duration-200 rounded-md md:p-4 p-2"
                >
                  <ImageWrap
                    image={character.img}
                    className="w-full h-full"
                    alt={character.name}
                    objectStatus="object-contain"
                  />
                  <Text as="h5" className="font-belanosima text-xs">
                    {character.name}
                  </Text>
                </div>
              ))}
              {selectedCharacters.length > 0 && (
                <Button
                  type="button"
                  className="bg-myGreen text-gray-950 p-2 rounded-full absolute right-2 bottom-2 z-10 font-bold text-lg"
                  onClick={handleReset}
                >
                  <HiOutlineArrowPath />
                </Button>
              )}
            </div>

            <Text
              as="p"
              className="font-semibold font-barlow text-md md:text-xl tracking-wide text-center"
            >
              Total Price: {totalCharacterPrice} points
            </Text>
            <Text
              as="p"
              className=" text-gray-400 font-thin font-poppins text-sm md:text-md tracking-wide text-center"
            >
              Your Availabe point: {(profileData?.points as number) - totalCharacterPrice} points
            </Text>

            <Button
              type="button"
              className=" text-[#0f161b] uppercase font-bold tracking-[1px] text-xs md:text-sm p-1 md:px-[30px] md:py-3.5 border-[none] bg-[#58105a]  font-barlow hover:bg-[#ffbe18] clip-path-polygon-[100%_0,100%_65%,89%_100%,0_100%,0_0]"
              onClick={handlePurchaseCharacter}
            > { submiting ?
              (<div className="animate-spin rounded-full ml-auto mr-auto h-6 w-6 border-t-2 border-b-2 border-yellow-900"></div>)
              : 
              "Purchase Players"
            }
            </Button>
          </main>
        </section>
      </main>
    </section>
  );
};

export default PurchaseCharacter;

type DataType = {
  id: number;
  name: string;
  img: string;
  health: number;
  strength: number;
  attack: number;
  speed: number;
  superPower: string;
  totalWins: number;
  totalLoss: number;
  profileImg: string;
  price: number;
  owner: string;
};

export const data: DataType[] = [
  {
    id: 1,
    name: "Pikachu",
    img: Img1,
    health: 0,
    strength: 8,
    attack: 15,
    speed: 10,
    superPower: "Thunderbolt",
    totalWins: 270,
    totalLoss: 0,
    profileImg: Img1,
    price: 100,
    owner: "",
  },
  {
    id: 2,
    name: "Charizard",
    img: Img2,
    health: 95,
    strength: 10,
    attack: 13,
    speed: 7,
    superPower: "Flamethrower",
    totalWins: 390,
    totalLoss: 0,
    profileImg: Img2,
    price: 100,
    owner: "",
  },
  {
    id: 3,
    name: "Bulbasaur",
    img: Img3,
    health: 60,
    strength: 5,
    attack: 10,
    speed: 8,
    superPower: "Vine Whip",
    totalWins: 250,
    totalLoss: 0,
    profileImg: Img3,
    price: 100,
    owner: "",
  },
  {
    id: 4,
    name: "Squirtle",
    img: Img4,
    health: 90,
    strength: 10,
    attack: 16,
    speed: 9,
    superPower: "Water Gun",
    totalWins: 380,
    totalLoss: 0,
    profileImg: Img4,
    price: 100,
    owner: "",
  },
  {
    id: 5,
    name: "Jigglypuff",
    img: Img5,
    health: 75,
    strength: 7,
    attack: 13,
    speed: 9,
    superPower: "Sleep Song",
    totalWins: 300,
    totalLoss: 0,
    profileImg: Img5,
    price: 100,
    owner: "",
  },
  {
    id: 6,
    name: "Mewtwo",
    img: Img6,
    health: 90,
    strength: 12,
    attack: 16,
    speed: 6,
    superPower: "Psychic",
    totalWins: 380,
    totalLoss: 0,
    profileImg: Img6,
    price: 100,
    owner: "",
  },
  {
    id: 7,
    name: "Eevee",
    img: Img7,
    health: 100,
    strength: 11,
    attack: 15,
    speed: 7,
    superPower: "Adaptability",
    totalWins: 410,
    totalLoss: 0,
    profileImg: Img7,
    price: 100,
    owner: "",
  },
  {
    id: 8,
    name: "Gengar",
    img: Img8,
    health: 100,
    strength: 12,
    attack: 15,
    speed: 6,
    superPower: "Shadow Ball",
    totalWins: 420,
    totalLoss: 0,
    profileImg: Img8,
    price: 100,
    owner: "",
  },
];
