export function getIdRegion(stateAcronym: string): number {
    switch (true) {
        case ('AC' == stateAcronym || stateAcronym == 'Acre'):
            return 1;
        case ('AL' == stateAcronym || stateAcronym == 'Alagoas'):
            return 2;
        case ('AP' == stateAcronym || stateAcronym == 'Amapá'):
            return 3;
        case ('AM' == stateAcronym || stateAcronym == 'Amazonas'):
            return 4;
        case ('BA' == stateAcronym || stateAcronym == 'Bahia'):
            return 5;
        case ('CE' == stateAcronym || stateAcronym == 'Ceará'):
            return 6;
        case ('ES' == stateAcronym || stateAcronym == 'Espírito Santo'):
            return 7;
        case ('GO' == stateAcronym || stateAcronym == 'Goiás'):
            return 8;
        case ('MA' == stateAcronym || stateAcronym == 'Maranhão'):
            return 9;
        case ('MT' == stateAcronym || stateAcronym == 'Mato Grosso'):
            return 10;
        case ('MS' == stateAcronym || stateAcronym == 'Mato Grosso do Sul'):
            return 11;
        case ('MG' == stateAcronym || stateAcronym == 'Minas Gerais'):
            return 12;
        case ('PA' == stateAcronym || stateAcronym == 'Pará'):
            return 13;
        case ('PB' == stateAcronym || stateAcronym == 'Paraíba'):
            return 14;
        case ('PR' == stateAcronym || stateAcronym == 'Paraná'):
            return 15;
        case ('PE' == stateAcronym || stateAcronym == 'Pernambuco'):
            return 16;
        case ('PI' == stateAcronym || stateAcronym == 'Piauí'):
            return 17;
        case ('RJ' == stateAcronym || stateAcronym == 'Rio de Janeiro'):
            return 18;
        case ('RN' == stateAcronym || stateAcronym == 'Rio Grande do Norte'):
            return 19;
        case ('RS' == stateAcronym || stateAcronym == 'Rio Grande do Sul'):
            return 20;
        case ('RO' == stateAcronym || stateAcronym == 'Rondônia'):
            return 21;
        case ('RR' == stateAcronym || stateAcronym == 'Roraima'):
            return 22;
        case ('SC' == stateAcronym || stateAcronym == 'Santa Catarina'):
            return 23;
        case ('SP' == stateAcronym || stateAcronym == 'São Paulo'):
            return 24;
        case ('SE' == stateAcronym || stateAcronym == 'Sergipe'):
            return 25;
        case ('TO' == stateAcronym || stateAcronym == 'Tocantins'):
            return 26;
        case ('DF' == stateAcronym || stateAcronym == 'Distrito Federal'):
            return 27;
        default:
            return 0;
    }
};