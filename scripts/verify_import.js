import { execSync } from 'child_process';

const projectId = 'myprompts-e1453';

async function verify() {
    try {
        console.log(`Verifying migration for project: ${projectId}`);
        // Get access token from gcloud
        const token = execSync('gcloud auth print-access-token').toString().trim();
        console.log('Successfully acquired access token.');

        // List root collections
        const listCollectionsUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:listCollectionIds`;

        console.log('Listing root collections...');
        const listResponse = await fetch(listCollectionsUrl, {
            method: 'POST', // listCollectionIds is a POST method
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const listText = await listResponse.text();
        const listData = JSON.parse(listText);

        if (listData.collectionIds && listData.collectionIds.length > 0) {
            console.log('Found collections:', listData.collectionIds);
            const firstCollection = listData.collectionIds[0];
            console.log(`Querying documents from first collection: '${firstCollection}'...`);

            const docsUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${firstCollection}`;
            const docsResponse = await fetch(docsUrl, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const docsData = await docsResponse.json();

            if (docsData.documents && docsData.documents.length > 0) {
                console.log(`Success! Found ${docsData.documents.length} documents in '${firstCollection}'.`);
                console.log('Sample Document:', JSON.stringify(docsData.documents[0], null, 2));
            } else {
                console.log(`Collection '${firstCollection}' is empty (or contains only subcollections).`);
                console.log('Raw response:', JSON.stringify(docsData, null, 2));
            }

        } else {
            console.log('No collections found in the database.');
            console.log('Raw response:', JSON.stringify(listData, null, 2));
        }
    } catch (error) {
        console.error('Verification failed:', error);
    }
}

verify();
