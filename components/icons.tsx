import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function MailIcon(props: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M21.0479 7.36437L12.3105 13.481C12.1384 13.6015 11.9095 13.6015 11.7373 13.481L3 7.365V17.833C3 18.6043 3.63303 19.238 4.4043 19.2383H19.6426C20.4141 19.2383 21.0479 18.6045 21.0479 17.833V7.36437ZM19.6426 5C20.3306 5 20.9091 5.50365 21.0262 6.15981L12.0234 12.4605L3.02162 6.15981C3.13864 5.5038 3.7165 5.00023 4.4043 5H19.6426ZM19.6426 20.2383C20.9663 20.2383 22.0479 19.1568 22.0479 17.833V6.4043C22.0476 5.08075 20.9662 4 19.6426 4H4.4043C3.0809 4.00025 2.00025 5.0809 2 6.4043V17.833C2 19.1566 3.08075 20.238 4.4043 20.2383H19.6426Z" fill="currentColor"/>
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M20.964 16.477v2.709a1.94 1.94 0 01-.584 1.339 1.96 1.96 0 01-1.384.468c-2.78-.302-5.45-1.252-7.796-2.773a18.462 18.462 0 01-5.42-5.42C4.254 10.444 3.304 7.761 3.007 4.97a1.913 1.913 0 01.466-1.384A1.94 1.94 0 014.805 3h2.71a1.86 1.86 0 011.806 1.553c.114.867.327 1.719.632 2.538a1.82 1.82 0 01-.407 1.906L8.4 10.145a14.678 14.678 0 005.42 5.42l1.147-1.148a1.82 1.82 0 011.906-.406c.82.306 1.67.518 2.538.632a1.871 1.871 0 011.553 1.834z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M19.553 2.997c-.253.012-.49.085-.7.167h-.004c-.213.085-1.23.513-2.774 1.16-1.544.648-3.548 1.491-5.537 2.329-3.973 1.673-7.878 3.32-7.878 3.32l.047-.018s-.27.088-.551.281a1.322 1.322 0 00-.44.425c-.137.202-.249.512-.207.832.067.542.418.867.67 1.046.255.181.498.266.498.266h.006l3.662 1.234c.164.527 1.116 3.656 1.345 4.377.134.43.266.7.43.905.08.106.173.193.285.264a.756.756 0 00.137.064l-.037-.009c.012.003.02.012.03.015.028.009.049.012.087.018.58.176 1.046-.184 1.046-.184l.027-.02 2.162-1.97 3.624 2.781.082.035c.756.331 1.52.147 1.925-.179.406-.328.564-.747.564-.747l.027-.068 2.8-14.345c.08-.354.1-.686.012-1.008a1.227 1.227 0 00-.586-.785 1.197 1.197 0 00-.8-.214zm-.077 1.538a.348.348 0 00-.014.132v.009L16.687 18.873c-.012.02-.032.064-.088.108-.056.047-.103.076-.346-.027l-4.433-3.399-2.677 2.44.563-3.591s6.943-6.473 7.242-6.75c.299-.28.199-.338.199-.338.02-.34-.45-.1-.45-.1l-9.132 5.657-.003-.015-4.38-1.473v-.003a.025.025 0 00-.01 0l.023-.009.024-.011.023-.009s3.908-1.646 7.88-3.32c1.99-.837 3.994-1.681 5.535-2.331 1.54-.648 2.68-1.122 2.745-1.149.061-.023.031-.023.076-.023z" fill="currentColor"/>
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M20.52 2H3.477C2.66 2 2 2.645 2 3.441v17.114C2 21.352 2.66 22 3.477 22H20.52c.816 0 1.48-.648 1.48-1.441V3.441C22 2.645 21.336 2 20.52 2zM7.934 19.043H4.965V9.496h2.969v9.547zM6.449 8.195a1.72 1.72 0 01-1.722-1.718c0-.95.77-1.719 1.722-1.719s1.719.77 1.719 1.719c0 .945-.77 1.718-1.719 1.718zm12.594 10.848h-2.965v-4.64c0-1.106-.02-2.532-1.543-2.532-1.543 0-1.777 1.207-1.777 2.453v4.72H9.797V9.495h2.844v1.305h.039c.395-.75 1.364-1.543 2.805-1.543 3.004 0 3.558 1.977 3.558 4.547v5.239z" fill="currentColor"/>
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M17.439 4h2.81l-6.14 7.02L21.333 20.57h-5.657l-4.43-5.793-5.07 5.793H3.362l6.569-7.508L3 4h5.801l4.005 5.295L17.439 4zm-.987 14.889h1.557L8.955 5.594H7.283l9.169 13.295z" fill="currentColor"/>
    </svg>
  );
}

export function LocationIcon(props: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.2 21C9.5 21 5 14.176 5 10.2 5 6.224 8.224 3 12.2 3s7.2 3.224 7.2 7.2c0 3.976-4.5 10.8-7.2 10.8zm0-1.8c.47 0 1.86-1.216 3.113-3.104C16.693 14.018 17.6 11.673 17.6 10.2a5.4 5.4 0 10-10.8 0c0 1.473.907 3.817 2.287 5.896C10.34 17.984 11.73 19.2 12.2 19.2zm0-7.2a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6z" fill="currentColor"/>
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" aria-hidden {...props}>
      <path d="M1 12h28.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
      <path d="M22.886 2 31 12l-8.114 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
    </svg>
  );
}

export function DomainExpertiseIcon(props: IconProps) {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden {...props}>
      <path d="M21.1084 2.04102C21.2236 2.07384 21.3925 2.12193 21.6074 2.18359C22.0377 2.30705 22.6529 2.48406 23.3906 2.69922C24.8665 3.12968 26.8347 3.71184 28.8018 4.31836C30.7695 4.9251 32.7341 5.55589 34.2051 6.08301C34.9412 6.3468 35.5481 6.58263 35.9688 6.77539C36.1804 6.87239 36.3362 6.95509 36.4355 7.02051C36.4649 7.03983 36.4853 7.05633 36.5 7.06836V22.9248C36.5 26.837 33.6854 30.5794 30.3906 33.6016C27.1077 36.6127 23.4073 38.8549 21.7539 39.7686L21.7451 39.7734L21.7363 39.7793C21.5184 39.9249 21.2621 40.0029 21 40.0029L20.8047 39.9883C20.612 39.9596 20.427 39.8884 20.2637 39.7793L20.2529 39.7725L19.5537 39.3535C17.7175 38.2394 14.5241 36.194 11.6416 33.5684C8.3351 30.5565 5.5 26.836 5.5 22.9248V7.06836C5.51466 7.05633 5.53511 7.03983 5.56445 7.02051C5.66383 6.95509 5.81961 6.87239 6.03125 6.77539C6.45186 6.58263 7.05878 6.3468 7.79492 6.08301C9.26595 5.55589 11.2305 4.9251 13.1982 4.31836C15.1653 3.71184 17.1335 3.12968 18.6094 2.69922C19.3471 2.48406 19.9623 2.30705 20.3926 2.18359C20.6075 2.12193 20.7764 2.07384 20.8916 2.04102C20.9359 2.02838 20.972 2.01674 21 2.00879C21.028 2.01674 21.0641 2.02838 21.1084 2.04102ZM20.998 29.5C18.4632 29.5184 15.95 29.9671 13.5654 30.8271L13.1689 30.9707L13.4844 31.25C15.7692 33.2716 18.2436 35.0682 20.873 36.6152L20.9971 36.6885L21.1221 36.6182C23.788 35.121 26.2709 33.3178 28.5195 31.2461L28.8213 30.9678L28.4355 30.8271C26.0527 29.9584 23.5372 29.5097 21.001 29.5H20.998ZM33.5 9.00879L33.3311 8.95117C30.7876 8.07413 25.7083 6.49776 21.0684 5.18457L21 5.16504L20.9316 5.18457C16.2976 6.4961 11.2109 7.98696 8.66113 8.9541L8.5 9.01465V22.9248C8.5 24.4029 9.23508 26.2947 10.916 28.418L11.0342 28.5664L11.209 28.4932C14.3128 27.2021 17.6375 26.5252 20.999 26.5C24.3892 26.5333 27.7421 27.2103 30.8799 28.4941L31.0596 28.5674L31.1748 28.4121C32.7656 26.2911 33.5 24.4012 33.5 22.9248V9.00879Z" fill="currentColor"/>
      <path d="M21 9C22.7902 9 24.5076 9.71069 25.7734 10.9766C27.0393 12.2424 27.75 13.9598 27.75 15.75C27.75 17.085 27.354 18.39 26.6123 19.5C25.8706 20.61 24.8164 21.4754 23.583 21.9863C22.3498 22.4971 20.9928 22.6305 19.6836 22.3701C18.3742 22.1097 17.1706 21.4674 16.2266 20.5234C15.2826 19.5794 14.6403 18.3758 14.3799 17.0664C14.1195 15.7572 14.2529 14.4002 14.7637 13.167C15.2746 11.9336 16.14 10.8794 17.25 10.1377C18.36 9.396 19.665 9 21 9ZM21 12C20.0054 12 19.0519 12.3954 18.3486 13.0986C17.6454 13.8019 17.25 14.7554 17.25 15.75C17.25 16.4915 17.4699 17.2164 17.8818 17.833C18.2939 18.4497 18.8802 18.931 19.5654 19.2148C20.2505 19.4985 21.0042 19.5724 21.7314 19.4277C22.4589 19.283 23.1269 18.9258 23.6514 18.4014C24.1758 17.8769 24.533 17.2089 24.6777 16.4814C24.8224 15.754 24.7487 14.9996 24.4648 14.3145C24.181 13.6294 23.6996 13.0438 23.083 12.6318C22.4664 12.2199 21.7415 12 21 12Z" fill="currentColor"/>
    </svg>
  );
}

export function AgileExecutionIcon(props: IconProps) {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden {...props}>
      <path d="M8.85766 21C9.71884 14.094 15.61 8.75 22.7493 8.75C30.4813 8.75 36.7493 15.018 36.7493 22.75C36.7493 30.482 30.4813 36.75 22.7493 36.75H14M22.75 22.75V15.75M19.25 5.25H26.25M5.25 26.25H14M8.75 31.5H17.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function TransparencyIcon(props: IconProps) {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M21 4.375C14.3325 4.375 9.625 9.17525 9.625 15.0833C9.625 17.7713 10.731 19.5842 12.1187 21.3132C12.4197 21.6895 12.726 22.0517 13.041 22.4245L13.209 22.6205C13.5765 23.058 13.9563 23.5095 14.3115 23.975C15.0185 24.9042 15.6818 25.949 16.0527 27.1845C16.1436 27.5149 16.1017 27.8678 15.9358 28.1676C15.77 28.4675 15.4935 28.6907 15.1653 28.7894C14.8372 28.8881 14.4834 28.8546 14.1797 28.6959C13.8759 28.5373 13.6463 28.2662 13.5397 27.9405C13.2982 27.1355 12.845 26.383 12.222 25.5657C11.893 25.1408 11.5534 24.7242 11.2035 24.3162L11.0425 24.1237C10.7275 23.7527 10.395 23.3607 10.0712 22.9565C8.5225 21.028 7 18.6392 7 15.0815C7 7.63525 12.9762 1.75 21 1.75C29.0237 1.75 35 7.6335 35 15.0833C35 18.6393 33.4775 21.028 31.9287 22.9582C31.605 23.3607 31.2725 23.7527 30.9575 24.1255L30.7965 24.3162C30.429 24.7502 30.0877 25.158 29.778 25.5657C29.155 26.383 28.7017 27.1372 28.4602 27.9405C28.36 28.274 28.1314 28.554 27.8247 28.7189C27.518 28.8838 27.1583 28.9201 26.8249 28.8199C26.4914 28.7196 26.2114 28.491 26.0465 28.1843C25.8816 27.8776 25.8452 27.518 25.9455 27.1845C26.3182 25.949 26.9815 24.9042 27.6902 23.975C28.0437 23.5095 28.4235 23.058 28.7927 22.6205L28.959 22.4245C29.274 22.0517 29.5802 21.6895 29.8812 21.315C31.269 19.5825 32.375 17.7713 32.375 15.0833C32.375 9.17525 27.6675 4.375 21 4.375ZM16.625 38.0625C16.625 37.7144 16.7633 37.3806 17.0094 37.1344C17.2556 36.8883 17.5894 36.75 17.9375 36.75H24.0625C24.4106 36.75 24.7444 36.8883 24.9906 37.1344C25.2367 37.3806 25.375 37.7144 25.375 38.0625C25.375 38.4106 25.2367 38.7444 24.9906 38.9906C24.7444 39.2367 24.4106 39.375 24.0625 39.375H17.9375C17.5894 39.375 17.2556 39.2367 17.0094 38.9906C16.7633 38.7444 16.625 38.4106 16.625 38.0625ZM15.3125 31.5C14.9644 31.5 14.6306 31.6383 14.3844 31.8844C14.1383 32.1306 14 32.4644 14 32.8125C14 33.1606 14.1383 33.4944 14.3844 33.7406C14.6306 33.9867 14.9644 34.125 15.3125 34.125H26.6875C27.0356 34.125 27.3694 33.9867 27.6156 33.7406C27.8617 33.4944 28 33.1606 28 32.8125C28 32.4644 27.8617 32.1306 27.6156 31.8844C27.3694 31.6383 27.0356 31.5 26.6875 31.5H15.3125Z" fill="currentColor"/>
    </svg>
  );
}

export function CoinIcon(props: IconProps) {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden {...props}>
      <g clipPath="url(#coin-clip)">
        <path d="M5.25 21C5.25 23.0683 5.65739 25.1164 6.4489 27.0273C7.24041 28.9381 8.40055 30.6744 9.86307 32.1369C11.3256 33.5995 13.0619 34.7596 14.9727 35.5511C16.8836 36.3426 18.9317 36.75 21 36.75C23.0683 36.75 25.1164 36.3426 27.0273 35.5511C28.9381 34.7596 30.6744 33.5995 32.1369 32.1369C33.5995 30.6744 34.7596 28.9381 35.5511 27.0273C36.3426 25.1164 36.75 23.0683 36.75 21C36.75 18.9317 36.3426 16.8836 35.5511 14.9727C34.7596 13.0619 33.5995 11.3256 32.1369 9.86307C30.6744 8.40055 28.9381 7.24041 27.0273 6.4489C25.1164 5.65739 23.0683 5.25 21 5.25C18.9317 5.25 16.8836 5.65739 14.9727 6.4489C13.0619 7.24041 11.3256 8.40055 9.86307 9.86307C8.40055 11.3256 7.24041 13.0619 6.4489 14.9727C5.65739 16.8836 5.25 18.9317 5.25 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M25.9 15.75C25.583 15.2001 25.1224 14.7468 24.5675 14.4385C24.0126 14.1302 23.3844 13.9787 22.75 14H19.25C18.3217 14 17.4315 14.3688 16.7751 15.0252C16.1187 15.6815 15.75 16.5718 15.75 17.5C15.75 18.4283 16.1187 19.3185 16.7751 19.9749C17.4315 20.6313 18.3217 21 19.25 21H22.75C23.6783 21 24.5685 21.3688 25.2249 22.0252C25.8813 22.6815 26.25 23.5718 26.25 24.5C26.25 25.4283 25.8813 26.3185 25.2249 26.9749C24.5685 27.6313 23.6783 28 22.75 28H19.25C18.6156 28.0214 17.9874 27.8698 17.4325 27.5616C16.8776 27.2533 16.417 26.7999 16.1 26.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12.25V29.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="coin-clip">
          <rect width="42" height="42" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

export function TrendingUpIcon(props: IconProps) {
  return (
    <svg width="42" height="42" viewBox="0 0 43 43" fill="none" aria-hidden {...props}>
      <g clipPath="url(#trending-clip)">
        <path d="M5.34814 30.3056L16.0444 19.6094L23.1753 26.7402L37.437 12.4785" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24.958 12.4785H37.437V24.9575" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="trending-clip">
          <rect width="42.7851" height="42.7851" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

export function ProgressBoltIcon(props: IconProps) {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden {...props}>
      <g clipPath="url(#bolt-clip)">
        <path d="M17.4999 36.3598C15.9767 36.0143 14.5138 35.4427 13.1599 34.6641" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24.5 5.64062C27.9793 6.43525 31.0857 8.38758 33.3106 11.178C35.5356 13.9684 36.7473 17.4315 36.7473 21.0004C36.7473 24.5692 35.5356 28.0324 33.3106 30.8228C31.0857 33.6132 27.9793 35.5655 24.5 36.3601" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.01322 29.913C7.0586 28.526 6.33357 26.9944 5.86597 25.377" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.46704 18.3752C5.74704 16.7127 6.28604 15.1377 7.04204 13.6939L7.33779 13.1602" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.0872 8.01362C13.7246 6.88645 15.5615 6.08113 17.4999 5.64062" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 15.75L17.5 21H24.5L21 26.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="bolt-clip">
          <rect width="42" height="42" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

export function FileAnalyticsIcon(props: IconProps) {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden {...props}>
      <g clipPath="url(#file-analytics-clip)">
        <path d="M24.5 5.25V12.25C24.5 12.7141 24.6844 13.1592 25.0126 13.4874C25.3408 13.8156 25.7859 14 26.25 14H33.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M29.75 36.75H12.25C11.3217 36.75 10.4315 36.3813 9.77513 35.7249C9.11875 35.0685 8.75 34.1783 8.75 33.25V8.75C8.75 7.82174 9.11875 6.9315 9.77513 6.27513C10.4315 5.61875 11.3217 5.25 12.25 5.25H24.5L33.25 14V33.25C33.25 34.1783 32.8813 35.0685 32.2249 35.7249C31.5685 36.3813 30.6783 36.75 29.75 36.75Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.75 29.75V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 29.75V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26.25 29.75V24.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="file-analytics-clip">
          <rect width="42" height="42" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ToolIcon(props: IconProps) {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden {...props}>
      <path d="M25.2 16.8L36.75 5.25M33.25 5.25h3.5v3.5M36.225 20.475c.321 1.149.487 2.334.525 3.525 0 7.042-5.708 12.75-12.75 12.75S11.25 31.042 11.25 24 16.958 11.25 24 11.25c1.19.038 2.376.204 3.525.525" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 29.75a5.75 5.75 0 100-11.5 5.75 5.75 0 000 11.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function RosetteCheckIcon(props: IconProps) {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden {...props}>
      <path d="M21 28c5.523 0 10-4.477 10-10S26.523 8 21 8s-10 4.477-10 10 4.477 10 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.31 26.37l-1.56 8.38 6.25-3.5 6.25 3.5-1.56-8.38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.5 18l3.5 3.5 5.25-5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function WorldClassIcon(props: IconProps) {
  return (
    <svg width="42" height="42" viewBox="0 0 34.5 34.5" fill="none" aria-hidden {...props}>
      <path d="M17.25 33.25C26.0866 33.25 33.25 26.0866 33.25 17.25C33.25 8.41344 26.0866 1.25 17.25 1.25C8.41344 1.25 1.25 8.41344 1.25 17.25C1.25 26.0866 8.41344 33.25 17.25 33.25Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.25 17.25H33.25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.2504 1.25C21.2524 5.63136 23.5268 11.3173 23.6504 17.25C23.5268 23.1827 21.2524 28.8686 17.2504 33.25C13.2483 28.8686 10.974 23.1827 10.8504 17.25C10.974 11.3173 13.2483 5.63136 17.2504 1.25Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
