# Azure IoT Workshop: Real-time asset tracking for international company Contoso Art Shipping

![Contoso Intro image](assets/contoso-art-shipping.png)

## Introduction and Scenario

Contoso Art Shipping Inc. is a company specialized in shipping artwork. They are losing money as their customers are generally dissatisfied with their service – more and more parcel are getting damaged due to adverse weather conditions and improper handling, which causes a tremendous increase in insurance claims, as well as associated personnel costs to follow up on said claims.

Contoso already have an ERP in place and they have built a mobile application that allows to show “basic” tracking information, essentially the parcel pick-up date and estimated delivery date.

They realize they need to be more precise on the location of the parcels, conditions during travel, and their overall ability to detect that goods are getting tampered during transport – they ship ~50,000 shipments a month with the issues mentioned above costing them an estimated \$2 per shipment on average, i.e over \$1M every year.

## Contoso Art Shipping's requirements in a nutshell

* **Track** in real-time the physical location and condition of their parcels
* Efficiently **store** this data so that it can be accessed and queried
* Get **alerts** when abnormal conditions are detected…
* …and visualize them on a **map**
* **Integrate** with their existing business applications
* **Scale** from a very small deployment to something much bigger

## Outline

In this workshop, you will be building Contoso Art Shipping's IoT solution.

1. [Connecting an asset tracking device to Azure IoT](step-001-connecting-a-device/)
2. [Setting up a data pipeline](step-002-setting-up-data-pipeline/)
3. [Anomaly detection](step-003-anomaly-detection/)
4. [Map visualization - Where are my parcels?](step-004-map-visualization/)

The last part will showcase how to feed your insights (we'll learn how to trigger events on sudden temperature variations on our asset tracking devices) into Contoso's ERP and mobile application. It will be shown through a demo, as time constraints don't allow for this part to be included in this one-day workshop.

## Supporting slide deck & video walkthrough

You can follow along using the [following slide deck](assets/Azure&#32;IoT&#32;Workshop&#32;-&#32;Realtime&#32;asset&#32;tracking.pdf).

The video recording below walks you through the various steps of the workshop in about 3 hours:

<iframe src="https://www.youtube.com/embed/3A6Lhakfyes" 
    width="560" 
    height="315"
    frameborder="0" 
    allowfullscreen>
</iframe>

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit [https://cla.opensource.microsoft.com](https://cla.opensource.microsoft.com).

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Legal Notices

Microsoft and any contributors grant you a license to the Microsoft documentation and other content
in this repository under the [Creative Commons Attribution 4.0 International Public License](https://creativecommons.org/licenses/by/4.0/legalcode),
see the [LICENSE](LICENSE) file, and grant you a license to any code in the repository under the [MIT License](https://opensource.org/licenses/MIT), see the
[LICENSE-CODE](LICENSE-CODE) file.

Microsoft, Windows, Microsoft Azure and/or other Microsoft products and services referenced in the documentation
may be either trademarks or registered trademarks of Microsoft in the United States and/or other countries.
The licenses for this project do not grant you rights to use any Microsoft names, logos, or trademarks.
Microsoft's general trademark guidelines can be found at [http://go.microsoft.com/fwlink/?LinkID=254653](http://go.microsoft.com/fwlink/?LinkID=254653).

Privacy information can be found at [https://privacy.microsoft.com/en-us/](https://privacy.microsoft.com/en-us/)

Microsoft and any contributors reserve all other rights, whether under their respective copyrights, patents,
or trademarks, whether by implication, estoppel or otherwise.
