import {JSX} from 'react/jsx-runtime'
import Snackbar from 'react-native-snackbar';
import React ,{useState}from 'react'
import { StyleSheet, View ,Text,StatusBar,Pressable,FlatList} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
   

} from 'react-native-safe-area-context';
import Icons from './components/Icons';
function App():JSX.Element {
   const [isCross, setIsCross]= useState<boolean>(false)
   const [gameWinner, setGameWinner]=useState<string>('')
   const [gameState, setGameState]= useState(new Array(9).fill('empty',0,9))

   const reloadGame=()=>{
    setIsCross(false)
    setGameWinner('')
    setGameState(new Array(9).fill('empty',0,9))
   }

   const checkWinner=()=>{
    if(
      gameState[0]!=='empty' &&
      gameState[0]===gameState[1] &&
      gameState[0]===gameState[2]
    )
    {
      setGameWinner(`${gameState[0]} won the game!🥳`)
    }
    else if(
      gameState[3]!=='empty' &&
      gameState[3]===gameState[4] &&
      gameState[4]===gameState[5]
    )
    {
      setGameWinner(`${gameState[3]} won the game!🥳`)
    }
    else if(
      gameState[6]!=='empty' &&
      gameState[6]===gameState[7] &&
      gameState[7]===gameState[8]
    )
    {
      setGameWinner(`${gameState[6]} won the game!🥳`)
    }
     else if(
      gameState[0]!=='empty' &&
      gameState[0]===gameState[3] &&
      gameState[3]===gameState[6]
    )
    {
      setGameWinner(`${gameState[0]} won the game!🥳`)
    }
    else if(
      gameState[1]!=='empty' &&
      gameState[1]===gameState[4] &&
      gameState[4]===gameState[7]
    )
    {
      setGameWinner(`${gameState[1]} won the game!🥳`)
    }
    else if(
      gameState[2]!=='empty' &&
      gameState[2]===gameState[5] &&
      gameState[5]===gameState[8]
    )
    {
      setGameWinner(`${gameState[2]} won the game!🥳`)
    }
    else if(
      gameState[0]!=='empty' &&
      gameState[0]===gameState[4] &&
      gameState[4]===gameState[8]
    )
    {
      setGameWinner(`${gameState[0]} won the game!🥳`)
    }
    else if(
      gameState[2]!=='empty' &&
      gameState[2]===gameState[4] &&
      gameState[4]===gameState[6]
    )
    {
      setGameWinner(`${gameState[2]} won the game!🥳`)
    }
    else if(!gameState.includes('empty',0)){
      setGameWinner('Draw game... ');
    }
   }
   const onChangeItem=(itemNumber:number)=>{
    if(gameWinner){
      return Snackbar.show({
        text:gameWinner,
        backgroundColor:'#000000',
        textColor:'#FFFFFF'
      })
    }
    if (gameState[itemNumber]==='empty'){
      gameState[itemNumber]=isCross? 'cross':'circle'
      setIsCross(!isCross)
    } else {
      return Snackbar.show({
        text:'position is already filled',
         backgroundColor:'#000000',
        textColor:'#FFF'
      })
    }
    checkWinner()
   }
  return (
    <SafeAreaView >
      <StatusBar  barStyle="dark-content" 
      />
    {gameWinner ? (
         <View style={[styles.playerInfo,styles.winnerInfo]}>
         <Text style={styles.winnerTxt}>{gameWinner}</Text>
         </View>  
  ) : (
    <View
          style={[styles.playerInfo,
                   isCross ? styles.playerX : styles.playerO
          ]}>
<Text> Player {isCross ? 'X' : 'O' } 's Turn</Text>

    </View>
    
  )}
    { /* Game Grid */ }
    <FlatList 
    numColumns={3}
    data={gameState}
    style={styles.grid}
    renderItem={({item, index}) => (
<Pressable
      key={index}
      style={styles.card}
      onPress={() => onChangeItem(index)}>
      <Icons name={item}/>

    </Pressable>
    ) }
    
/>
{/* game action */}
<Pressable
style={styles.gameBtn}
onPress={reloadGame}
>
  <Text style={styles.gameBtnTxt}>
    {gameWinner ? 'Start new game' :'Reload the game'}
  </Text>
</Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    playerInfo:{
       height:56,
       flexDirection:'row',
       justifyContent:'center',
       alignItems:'center',
       borderRadius:4,
       paddingVertical:5,
       marginVertical:12,
       marginHorizontal:14,
       
       shadowOffset:{
        width:1,
        height:1
       },
       shadowColor:'#333',
       shadowOpacity:0.2,
       shadowRadius:1.5

    },
    winnerInfo:{
         borderRadius:8,
         backgroundColor:'#38CC77',
         shadowOpacity:0.1
    },
    winnerTxt:{
           fontSize:20,
           color:'#FFFFFF',
           fontWeight:'600',
           textTransform:'capitalize'
    },
    playerX:{
      backgroundColor:'#38CC77'
    },
    playerO:{
       backgroundColor:'#F7CD2E'
    },
    grid:{
  margin:12
    },
    card:{
  height:100,
  width:'33.33%',
  alignItems:'center',
  justifyContent:'center',
  borderWidth:1,
   borderColor:'#333'

    },
    gameBtn:{
  alignItems:'center',
  padding:10,
  borderRadius:8,
  marginHorizontal:36,
  backgroundColor:'#8D3DAF'
    },
    gameBtnTxt:{
      fontSize:18,
      color:'#FFFFFF',
      fontWeight:'500'
    }
});

export default App;
