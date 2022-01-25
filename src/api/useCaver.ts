import Caver, { HttpProviderOptions, KeyringContainer } from 'caver-js';
import { COUNT_ABI } from '../abi/CounterABI';
import {
  AUTHORIZATION,
  CHAIN_ID,
  COUNT_CONTRACT_ADDRESS,
  KAIKAS_PRIVATE_KEY,
  klaytnApiUrl,
} from '../constants/constants.baobab';

export const option: HttpProviderOptions = {
  headers: [
    {
      name: 'Authorization',
      // 이게 결국 klaytn api Authorization과 같다
      value: AUTHORIZATION,
      // 'Basic' +
      // Buffer.from(ACCESS_KEY_ID + ':' + SECRET_ACCESS_KEY).toString('base64'),
    },
    {
      name: 'x-chain-id',
      value: CHAIN_ID,
    },
  ],
};

export const caver: Caver = new Caver(
  new Caver.providers.HttpProvider(klaytnApiUrl, option),
);

export const CountContract = new caver.contract(
  COUNT_ABI,
  COUNT_CONTRACT_ADDRESS,
);

export const getBalance = (address: string) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(
      caver.utils.hexToNumberString(response),
      'KLAY',
    );
    console.log('balance : ', balance);
    return balance;
  });
};

export const setCount = async (newCount: number) => {
  try {
    const caverWallet = caver.wallet as KeyringContainer;
    // 사용할 account 설정
    const deployer =
      caverWallet.keyring.createFromPrivateKey(KAIKAS_PRIVATE_KEY);
    caverWallet.add(deployer);
    // 스마트 컨트렉트 실행 트랜잭션 날리기
    // 결과 확인

    const receipt = await CountContract.methods.setCount(newCount).send({
      from: deployer.address,
      gas: '0x4bfd200',
    });
    console.log('receipt,', receipt);
  } catch (error) {
    console.log('error : ', error);
  }
};

export const readCount = async () => {
  const _count = await CountContract.methods.count().call();
  console.log('_count : ', _count);
};
