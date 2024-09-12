import {createClient}  from "@sanity/client";

export default createClient({
    projectId: "6xph20at",
    dataset: "production",
    useCdn: true,
    apiVersion: '2024-09-05'
});