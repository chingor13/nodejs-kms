// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START kms_set_cryptokey_primary_version]
async function setPrimaryCryptoKeyVersion(
  projectId = 'your-project-id', // Your GCP projectId
  keyRingId = 'my-key-ring', // Name of the crypto key version's key ring
  cryptoKeyId = 'my-key', // Name of the version's crypto key
  version = 1234 // The version's id
) {
  // Import the library and create a client
  const kms = require('@google-cloud/kms');
  const client = new kms.KeyManagementServiceClient();

  // The location of the crypto key versions's key ring, e.g. "global"
  const locationId = 'global';

  const name = client.cryptoKeyPath(
    projectId,
    locationId,
    keyRingId,
    cryptoKeyId
  );
  const cryptoKeyVersionId = version;
  const request = {name, cryptoKeyVersionId};

  // Sets a crypto key's primary version
  const [cryptoKey] = await client.updateCryptoKeyPrimaryVersion(request);
  console.log(
    `Set ${version} as primary version for crypto key ${cryptoKeyId}.\n`
  );
  console.log(`Name: ${cryptoKey.name}:`);
  console.log(`Created: ${new Date(cryptoKey.createTime)}`);
  console.log(`Purpose: ${cryptoKey.purpose}`);
  console.log(`Primary: ${cryptoKey.primary.name}`);
  console.log(`  State: ${cryptoKey.primary.state}`);
  console.log(`  Created: ${new Date(cryptoKey.primary.createTime)}`);
}
// [END kms_set_cryptokey_primary_version]

const args = process.argv.slice(2);
setPrimaryCryptoKeyVersion(...args).catch(console.error);
