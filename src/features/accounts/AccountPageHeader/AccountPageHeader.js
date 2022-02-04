import types from '@shared/types/user';

import AccountHeaderGrid from '@components/AccountHeaderGrid';

const AccountPageHeader = ({ account }) => {
  return (
    <section>
      <AccountHeaderGrid {...account} />
    </section>
  );
};

AccountPageHeader.propTypes = {
  account: types.UserAccount,
};

export default AccountPageHeader;
