/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition {

    export class HighlightSoonlyExpiringGiveaways implements SteamGiftsModule {
        timeLimit = 2; // in hours (int)

        style = "";

        init(): void {
        }

        render = () => {
            $("div.giveaway__row-outer-wrap").each((i: number, el: Element) => {
                this.highlight(el);
            });

            SGPP.on("EndlessScrollGiveaways", "addItem",(event: JQueryEventObject, el: Element) => {
                this.highlight(el);
            });
        }

        highlight = (el: Element) => {
            var remainingTimeNode = $(el).find("div.giveaway__columns > div:nth-child(1) > span");

            // Colorify gifts about to expire
            if (remainingTimeNode.text().search(new RegExp("^[1-" + this.timeLimit + "] hour|minute|second")) != -1)
                remainingTimeNode.parents().eq(0).css("background", "#FFFF66"); // equivalent to simply "parent()"
        }

        name(): string {
            return "Highlight giveaways expiring soon";
        }

        shouldRun = (location: SGLocation) => location.pageKind == 'giveaways';
    }
}
