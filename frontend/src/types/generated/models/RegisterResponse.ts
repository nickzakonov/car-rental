/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RegisterResponse = {
    status: RegisterResponse.status;
};

export namespace RegisterResponse {

    export enum status {
        SUCCESS = 'SUCCESS',
        FAILED = 'FAILED',
    }


}
