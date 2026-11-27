function createAccountNumber(profiles) {
  const existingNumbers = new Set(Object.values(profiles).map((profile) => profile?.accountNumber));
  let accountNumber;
  do {
    accountNumber = String(Math.floor(100000000 + Math.random() * 900000000));
  } while (existingNumbers.has(accountNumber));
  return accountNumber;
}

export function readAccountProfiles() {
  const storedProfiles = localStorage.getItem("accountProfiles") || localStorage.getItem("googleAccounts");
  if (!storedProfiles) return {};

  const profiles = JSON.parse(storedProfiles);
  if (!profiles || Array.isArray(profiles) || typeof profiles !== "object") {
    throw new Error("Saved account data is invalid. Clear this browser's saved accounts and try again.");
  }

  const createdEmail = localStorage.getItem("createdAccountEmail")?.toLowerCase();
  let didMigrate = false;
  Object.values(profiles).forEach((profile) => {
    const wasCreated = profile && (
      profile.accountCreated
      || (createdEmail && typeof profile.email === "string" && profile.email.trim().toLowerCase() === createdEmail)
    );
    if (!wasCreated) return;
    if (!profile.accountCreated) {
      profile.accountCreated = true;
      didMigrate = true;
    }
    if (!profile.accountNumber) {
      profile.accountNumber = createAccountNumber(profiles);
      didMigrate = true;
    }
  });
  if (didMigrate) localStorage.setItem("accountProfiles", JSON.stringify(profiles));

  return profiles;
}

export function readCurrentAccount() {
  const profiles = readAccountProfiles();
  const currentAccountId = localStorage.getItem("currentAccountId");
  if (currentAccountId && profiles[currentAccountId]) return profiles[currentAccountId];

  const legacyUserData = localStorage.getItem("googleUser");
  if (!legacyUserData) return null;

  const legacyUser = JSON.parse(legacyUserData);
  const email = legacyUser.email?.trim().toLowerCase() || "";
  const accountId = Object.keys(profiles).find((key) => (
    key.toLowerCase() === email
    || profiles[key]?.email?.trim().toLowerCase() === email
    || profiles[key]?.sub === legacyUser.sub
  )) || email || legacyUser.sub;
  if (!accountId) {
    localStorage.removeItem("googleUser");
    return null;
  }

  const profile = profiles[accountId] || legacyUser;
  localStorage.setItem("accountProfiles", JSON.stringify({ ...profiles, [accountId]: profile }));
  localStorage.setItem("currentAccountId", accountId);
  localStorage.removeItem("googleUser");
  return profile;
}

export function hasCreatedAccount(user) {
  const currentAccount = user || readCurrentAccount();
  return isAccountCreated(currentAccount);
}

export function isAccountCreated(user) {
  const createdEmail = localStorage.getItem("createdAccountEmail");
  return Boolean(
    user?.accountCreated
    || (user?.email
      && createdEmail
      && user.email.trim().toLowerCase() === createdEmail.trim().toLowerCase())
  );
}

export function markAccountCreated(email, details = {}) {
  if (email?.trim()) {
    const normalizedEmail = email.trim().toLowerCase();
    localStorage.setItem("createdAccountEmail", normalizedEmail);

    const profiles = readAccountProfiles();
    const accountId = localStorage.getItem("currentAccountId");
    const matchingId = accountId && profiles[accountId]?.email?.toLowerCase() === normalizedEmail
      ? accountId
      : Object.keys(profiles).find((key) => profiles[key]?.email?.trim().toLowerCase() === normalizedEmail);
    if (matchingId) {
      const currentProfile = profiles[matchingId];
      const accountNumber = currentProfile.accountNumber || createAccountNumber(profiles);

      localStorage.setItem("accountProfiles", JSON.stringify({
        ...profiles,
        [matchingId]: {
          ...currentProfile,
          ...details,
          accountNumber,
          accountCreated: true,
        },
      }));
    }
  }
}
