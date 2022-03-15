export interface Command {
    name: string;
    usage: string;
    description: string;
};

export type Commands = Array<Command>;

export async function generator(html: string, commands: Commands): Promise<string> {
    let rows: string = "";

    for await (const command of commands) {
        rows += `
        <tr>
            <td>${command.name}</td>
            <td><code>${command.usage}</code></td>
            <td>${command.description}</td>
        </tr>`;
    }

    return html.replace("$commands$", `
    <table>
        <tr>
            <th>Name</th>
            <th>Usage</th>
            <th>Description</th>
        </tr>
        ${rows}
    </table>
    `);
};
