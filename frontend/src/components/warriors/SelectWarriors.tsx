/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner'
import { ImageWrap } from '../atom/ImageWrap'
import { Text } from '../atom/Text'
import { Button } from '../atom/Button'
import { useState } from 'react'
import { HiOutlineArrowPath } from 'react-icons/hi2'
// import readGameState from "../../utils/readState.js"
// import signMessages from '../../utils/relayTransaction'
// import { useActiveAccount } from "thirdweb/react";
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import charactersdata from '../../utils/Charactersdata'
import { useProfileContext } from '../contexts/ProfileContext.js'
// import fetchNotices from '../../utils/readSubgraph'

// interface Character {
//     id: number;
//     name: string;
//     img: string;
//     price: number;
// }
// interface Duel {
//   duel_id: number
//   duel_creator: string
//   // duel_data: string;
// }

interface CharacterDetails {
  id: number
  name: string
  health: number
  strength: number
  attack: number
  speed: number
  owner: string
  price: number
  super_power: string
  total_battles: number
  total_losses: number
  total_wins: number
  img: string | undefined
}

// Define the ProfileData type
interface ProfileData {
  monika: string
  wallet_address: string
  avatar_url: string
  characters: string
  id: number
  cartesi_token_balance: number
  // Add other properties if needed
}

const SelectWarriors = () => {
  const location = useLocation()
  const [selectedCharacters, setSelectedCharacters] = useState<CharacterDetails[]>([])
  const [totalCharacterPrice, setTotalCharacterPrice] = useState<number>(0)
  // const [submitClicked, setSubmitClicked] = useState(false);
  const [selectedCharactersId, setSelectedCharactersId] = useState<number[]>([])
  const [profileData] = useState<ProfileData | null>(null)
  const [characterDetails, setCharacterDetails] = useState<CharacterDetails[]>([])
  // const [, setPlayersCharacters] = useState<CharacterDetails[]>([])
  const navigate = useNavigate()
  // const activeAccount = useActiveAccount();
  const [acceptStake, setAcceptStake] = useState(false)
  const [stakeAmount, setStakeAmount] = useState<number>(0.0)
  const [submiting, setSubmiting] = useState<boolean>(false)
  const { profile} = useProfileContext()

  function shuffleArray(array: CharacterDetails[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  useEffect(() => {
    async function rigPage() {
      let myCharacters: CharacterDetails[] = []

      // if (
      //   activeAccount?.address?.toLowerCase() !=
      //   profile?.wallet_address?.toLowerCase()
      // ) {
      //   try {
      //     let request_payload = await fetchNotices("all_profiles");
      //     request_payload = request_payload.filter(
      //       (player: any) =>
      //         player.wallet_address == activeAccount?.address.toLowerCase()
      //     );
      //     if (request_payload.length > 0) {
      //       setProfile(request_payload[0]);
      //     } else {
      //       navigate("/profile");
      //     }
      //   } catch (e) {
      //     navigate("/profile");
      //     console.log(e);
      //   }
      // } else {
      //   setProfileData(profile);
      //   let request_payload = await fetchNotices("all_characters");
      //   request_payload = request_payload.filter(
      //     (character: CharacterDetails) =>
      //       character.owner == activeAccount?.address.toLowerCase()
      //   );
      //   console.log("Players characters: " + request_payload);
      //   setPlayersCharacters(request_payload);
      //   myCharacters = request_payload;

      //   if (request_payload.length == 0) {
      //     navigate("/profile/purchasecharacter");
      //   }
      // }

      if (profile && profile.characters) {
        const characters = JSON.parse(profile.characters.replace(/\\/g, ''))

        console.log(characters, 'characters')

        const charIds = characters.map((character: any) => character.char_id)

        console.log(charIds, 'charIds')

        const newArray: CharacterDetails[] = []
        for (let i = 0; i < myCharacters.length; i++) {
          const characterData = charactersdata.find(
            (character) => character.name === myCharacters[i].name
          )
          console.log(characterData, 'characterData')
          console.log(myCharacters, 'myCharacters')

          const details = {
            ...myCharacters[i],
            img: characterData ? characterData.img : undefined,
          }
          console.log(details)
          newArray.push(details)
        }
        console.log(newArray)
        setCharacterDetails(newArray)
      }
    }
    rigPage()
  }, [location])

  // function findHighestIdDuel(duels: Duel[], creator: string): Duel | null {
  //   // Filter duels by the given duel_creator
  //   const filteredDuels = duels.filter(
  //     (duel) => duel.duel_creator.toLowerCase() === creator.toLowerCase()
  //   )

  //   if (filteredDuels.length === 0) {
  //     return null // Return null if no duels are found for the given creator
  //   }
  //   console.log('see them', filteredDuels)
  //   // Find the duel with the highest id
  //   let highestIdDuel = filteredDuels[0]

  //   for (let i = 0; i < filteredDuels.length; i++) {
  //     if (Number(filteredDuels[i].duel_id) > Number(highestIdDuel.duel_id)) {
  //       highestIdDuel = filteredDuels[i]
  //     }
  //   }

  //   return highestIdDuel
  // }

  if (!profileData) {
    navigate('/profile')
  }

  if (!profileData?.characters) {
    return (
      <div>
        <Link
          to='/profile/purchasecharacter'
          className='bg-myGreen text-black font-bold py-2 px-4 rounded-full hover:bg-green-500'
        >
          You don't have any characters. Click here to create one.
        </Link>
      </div>
    )
  }

  // function getArrayLength(jsonString: string): number | null {
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

  // function delay(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms))
  // }

  const submitTx = async () => {
    if (selectedCharactersId.length < 3) {
      toast.error('You can have to select 3 characters.', {
        position: 'top-right',
      })
      return
    } else if (stakeAmount > profileData?.cartesi_token_balance) {
      toast.error("You don't have enough Cartesi Tokens.", {
        position: 'top-right',
      })
      return
    } else if (acceptStake && stakeAmount == 0) {
      toast.error('Please disable stake if you intend to stake 0 tokens', {
        position: 'top-right',
      })
      return
    }
    interface MessageData {
      func: string // Function name
      data: {
        // Object that contains relevant duel information
        char_id1: number // First character ID
        char_id2: number // Second character ID
        char_id3: number // Third character ID
        has_staked: boolean // Indicates if there is a stake
        stake_amount: number // Amount staked
      }
    }

    // Main logic to create the data object
    const dataObject: MessageData = {
      func: 'create_duel',
      data: {
        // Wrapping existing properties in a 'data' object
        char_id1: selectedCharacters[0].id,
        char_id2: selectedCharacters[1].id,
        char_id3: selectedCharacters[2].id,
        has_staked: acceptStake,
        stake_amount: stakeAmount ? stakeAmount : 0,
      },
    }

    console.log(dataObject, 'dataObject')

    // Set the submitting state to true
    setSubmiting(true)
    // const txhash = await signMessages(dataObject)

    // if (txhash) {
      // await delay(4000)

      // const duels = await fetchNotices('all_duels')
      // const userDuels = findHighestIdDuel(
      //   duels,
      //   activeAccount?.address as string
      // );
      // navigate(`/strategy/${userDuels?.duel_id}`);
      // const {Status, request_payload} = await readGameState(`profile/${activeAccount?.address}`); // Call your function
      //   try {
      //     let request_payload = await fetchNotices("all_tx");
      //     request_payload = request_payload.filter(
      //       (tx: any) => tx.caller == activeAccount?.address.toLowerCase()
      //     );
      //     let Highest_tx;
      //     for (let i = 0; i < request_payload.length; i++) {
      //       Highest_tx = request_payload[i];
      //       if (request_payload[i].tx_id > Highest_tx.tx_id) {
      //         Highest_tx = request_payload[i];
      //       }
      //     }

      //     if (Highest_tx.method == "create_duel") {
      //       toast.success("Transaction Successful.. Duel Created", {
      //         position: "top-right",
      //       });
      //       setTotalCharacterPrice(0);
      //       setSelectedCharacters([]);
      //       setSelectedCharactersId([]);
      //       const duels = await fetchNotices("all_duels");
      //       const userDuels = findHighestIdDuel(
      //         duels,
      //         activeAccount?.address as string
      //       );
      //       navigate(`/strategy/${userDuels?.duel_id}`);
      //     } else {
      //       toast.error("Transaction Failed.. Try again later.", {
      //         position: "top-right",
      //       });
      //       setSubmiting(false);
      //     }
      //   } catch (err) {
      //     console.log(err);
      //     setSubmiting(false);
      //     toast.error("Transaction Failed.. Try again later.", {
      //       position: "top-right",
      //     });
      //     setSubmiting(false);
      //   }
    // }
    setSubmiting(false)
  }

//   try {
//     const txhash = await signMessages(dataObject); // Now the payload is structured correctly

//     if (txhash) {
//         await delay(4000);

//         const duels = await fetchNotices("all_duels");
//         // Add your logic to handle duels here
//         // For example, navigating to the strategy page based on user duels
//         // const userDuels = findHighestIdDuel(duels, activeAccount?.address as string);
//         // navigate(`/strategy/${userDuels?.duel_id}`);

//         // Handle the transaction response
//         // const { Status, request_payload } = await readGameState(`profile/${activeAccount?.address}`); // Call your function
//         try {
//             let request_payload = await fetchNotices("all_tx");
//             request_payload = request_payload.filter(
//                 (tx: any) => tx.caller == activeAccount?.address.toLowerCase()
//             );

//             let highestTx = request_payload.reduce((prev: any, current: any) => {
//                 return (prev.tx_id > current.tx_id) ? prev : current;
//             });

//             if (highestTx.method === "create_duel") {
//                 toast.success("Transaction Successful.. Duel Created", {
//                     position: "top-right",
//                 });
//                 setTotalCharacterPrice(0);
//                 setSelectedCharacters([]);
//                 setSelectedCharactersId([]);
//                 const duels = await fetchNotices("all_duels");
//                 const userDuels = findHighestIdDuel(duels, activeAccount?.address as string);
//                 navigate(`/strategy/${userDuels?.duel_id}`);
//             } else {
//                 toast.error("Transaction Failed.. Try again later.", {
//                     position: "top-right",
//                 });
//             }
//         } catch (err) {
//             console.log(err);
//             toast.error("Transaction Failed.. Try again later.", {
//                 position: "top-right",
//             });
//         }
//     }
// } catch (err) {
//     console.log(err);
//     toast.error("Transaction Failed.. Try again later.", {
//         position: "top-right",
//     });
// } finally {
//     setSubmitting(false); // Ensure the submitting state is reset
// }

  const toggleCharacterSelection = (character: CharacterDetails) => {
    const index = selectedCharacters.findIndex((c) => c.id === character.id)
    if (index < 0) {
      if (selectedCharacters.length < 3) {
        setSelectedCharacters([...selectedCharacters, character])
        setSelectedCharactersId([...selectedCharactersId, character.id])
        setTotalCharacterPrice(character.price + totalCharacterPrice)
      } else {
        toast.error('You can select only 3 characters.', {
          position: 'top-right',
        })
      }
    } else {
      const updatedCharacters = [...selectedCharacters]
      const updatedCharactersId = [...selectedCharactersId]
      updatedCharacters.splice(index, 1)
      updatedCharactersId.splice(index, 1)

      setSelectedCharacters(updatedCharacters)
      setSelectedCharactersId(updatedCharactersId)
      setTotalCharacterPrice(totalCharacterPrice - character.price)
    }
  }

  const handleReset = () => {
    setSelectedCharacters([])
    setTotalCharacterPrice(0)
    setSelectedCharactersId([])
  }

  const handleSelectWarriors = (e: any) => {
    e.preventDefault()
    submitTx()
  }

  return (
    <section className='w-full h-auto bg-bodyBg'>
      <main className='w-full lg:py-24 md:py-24 py-20 md:px-6 px-3 flex flex-col items-center gap-4'>
        <Text
          as='h2'
          className='font-bold text-center uppercase lg:text-4xl md:text-3xl text-2xl font-belanosima'
        >
          Choose your warriors!
        </Text>

        <section className=' w-full mt-20 flex flex-row lg:gap-10 md:gap-20 gap-14'>
          <main className=' w-7/12 flex flex-col gap-4'>
            <Text
              as='h3'
              className='font-semibold font-belanosima text-2xl tracking-wide text-center'
            >
              Your Characters
            </Text>
            <div className='w-full grid md:grid-cols-4 grid-cols-2 gap-4 md:gap-6 lg:gap-4 md:px-2 lg:px-0'>
              {shuffleArray(characterDetails).map((item, index) => (
                <div
                  key={index}
                  className={`w-full border ${
                    selectedCharactersId.includes(item.id)
                      ? 'border-myGreen'
                      : 'border-gray-800'
                  } border-gray-800 bg-gray-900 flex flex-col items-center gap-2 cursor-pointer hover:border-myGreen/40 transition-all duration-200 rounded-md p-4`}
                  onClick={() => toggleCharacterSelection(item)}
                >
                  <ImageWrap
                    image={item.img as string}
                    className='w-full'
                    alt={item.name}
                    objectStatus='object-contain'
                  />
                  <Text as='h5' className='font-belanosima'>
                    {item.name}
                  </Text>
                  <div className='w-full grid grid-cols-2 gap-1'>
                    <Text as='span' className='text-gray-300 text-xs font-poppins'>
                      Health: {item.health}
                    </Text>
                    <Text as='span' className='text-gray-300 text-xs font-poppins'>
                      Attack: {item.attack}
                    </Text>
                    <Text as='span' className='text-gray-300 text-xs font-poppins'>
                      Strength: {item.strength}
                    </Text>
                    <Text as='span' className='text-gray-300 text-xs font-poppins'>
                      Speed: {item.speed}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </main>

          <main className='w-5/12 flex flex-col items-center gap-4'>
            <Text
              as='h3'
              className='font-semibold font-belanosima text-2xl tracking-wide text-center'
            >
              Selected Characters
            </Text>

            <div className='w-full relative md:w-[70%] lg:w-full grid grid-cols-3 md:gap-3 border border-gray-800 bg-gray-900 min-h-[240px] h-fit py-5 px-10 rounded-md'>
              {selectedCharacters?.map((character) => (
                <div
                  key={character.id}
                  className='w-full bg-gray-900 flex flex-col items-center gap-2 cursor-pointer hover:border-myGreen/40 transition-all duration-200 rounded-md md:p-4 p-2'
                >
                  <ImageWrap
                    image={character.img as string}
                    className='w-full'
                    alt={character.name}
                    objectStatus='object-contain'
                  />
                  <Text as='h5' className='font-belanosima'>
                    {character.name}
                  </Text>
                </div>
              ))}
              {selectedCharacters.length > 0 && (
                <Button
                  type='button'
                  className='bg-myGreen text-gray-950 p-2 rounded-full absolute right-2 bottom-2 z-10 font-bold text-lg'
                  onClick={handleReset}
                >
                  <HiOutlineArrowPath />
                </Button>
              )}
            </div>

            <div className=' w-full mx-auto shadow-md rounded-lg'>
              <Text
                as='p'
                className=' text-gray-400 font-thin font-poppins text-md tracking-wide text-center'
              >
                Your Availabe CTSI balance: {profileData?.cartesi_token_balance} CTSI
              </Text>
              <div className='mb-4'>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    className='form-checkbox text-indigo-600'
                    checked={acceptStake}
                    onChange={() => setAcceptStake(!acceptStake)}
                  />
                  <span className='ml-2 text-gray-400 font-poppins'>Accept stake</span>
                </label>
              </div>
              {acceptStake && (
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-400'>
                    Staked amount
                  </label>
                  <input
                    type='number'
                    className='mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-poppins text-gray-600'
                    value={stakeAmount}
                    placeholder='0.0'
                    onChange={(e) => setStakeAmount(Number(e.target.value))}
                  />
                </div>
              )}
            </div>

            <Button
              type='button'
              className=' text-[#0f161b] uppercase font-bold tracking-[1px] text-sm px-[30px] py-3.5 border-[none] bg-[#45f882]  font-barlow hover:bg-[#ffbe18] clip-path-polygon-[100%_0,100%_65%,89%_100%,0_100%,0_0]'
              onClick={handleSelectWarriors}
              disabled={submiting}
            >
              {submiting ? (
                <div className='animate-spin rounded-full ml-auto mr-auto h-6 w-6 border-t-2 border-b-2 border-yellow-900'></div>
              ) : (
                'Create Duel'
              )}
            </Button>
          </main>
        </section>
      </main>
    </section>
  )
}

export default SelectWarriors
