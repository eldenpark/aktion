import { createActionType } from 'aktion';

const rawActionType: RawActionTypeType = {
  DECREMENT: 0,
  INCREMENT: 0,
};

export default createActionType(rawActionType);

export interface RawActionTypeType {
  DECREMENT: 0;
  INCREMENT: 0;
}
