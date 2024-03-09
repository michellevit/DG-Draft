export interface Challenge {
    id: number;
    event_name: string;
    event_date_end: Date;
    challenger: {
      username: string;
    };
    challengee: {
      username: string;
    };
  }
  
  export interface ChallengeCardProps {
    challenge: Challenge;
  }