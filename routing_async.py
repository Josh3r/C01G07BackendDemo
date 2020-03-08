#How the queueing system works?
#1. We define the threshold of each agent to be able to entertain max 5 customers.
#2. Determine which agent has less than 5 customers.
#3. Sort the agent from most free to least free.
#4. Compare the first customer's request to the first agent in the sorted list that have the available skillset 
#5. Once a match is found, assign the customer to that agent's queue.
#6. Resort the agent queue
#7. Remove that customer from the customer list.
#8. Do it for the rest of the customers (using while loop)
#9. Once the customers are sorted into their respective queues with their respective agents,
#10. Assign the agent to the first available customer in their queue 
#11. Pop the first customer from the respective agent's queue.
import asyncio
#customerDataBase = [["Mri","Payment"]] not sure if we have a database for customer
customerList = [["Mri","Payment"],["Leonard","Payment"],["Adria","Payment"],["Chev","Payment"],["Jhin","Payment"],["Lux","Software"],["Olaf","Payment"]] #List of customer with their request
agentDataBase = [["John","Payment","Available"],["Ian","Software","Busy"],["Joshua","Payment","Available"]]
agentList = []
sortedAgentList = []
sortedAgentListNumber = []

class Agent(object):
    
    def __init__(self, name, skills, availability):
        self.name = name
        self.skills = skills
        self.availability = availability
        self.queue = []
        self.currentassignment = None
            
    def get_name(self):
        return self.name
    
    def get_skills(self):
        return self.skills
    
    def get_availability(self):
        return self.availability
        
    def get_queue(self):
        return self.queue
        
    def addToQueue(self, customer):
        self.queue.append(customer)
    
    def deleteFromQueue(self, customer):
        del self.queue[0]
        
    def setAvailable(self):
        self.availability = True
    
    def setUnavailable(self):
        self.availability = False
    
    def set_assignment(self):
        self.currentassignment = self.queue[0]
    
#Initialize Agent from agentDataBase
for i in agentDataBase: 
    i = Agent("{}".format(i[0]),"{}".format(i[1]),"{}".format(i[2]))
    agentList.append(i)
    
##If agent has less than 5 customers in their queue, add to the sortedAgentList
#for i in agentList:
#    if len(i.get_queue()) < 5: 
#        sortedAgentList.append(i)
#        sortedAgentListNumber.append(len(i.get_queue()))
    
async def checkAgentList(a):
    for i in a:
        if len(i.get_queue()) < 5:
            sortedAgentList.append(i)
            a.remove(i)
    
async def checkSortedList(a):
    for i in a:
        if len(i.get_queue()) > 5:
            a.remove(i)
            
        
checkAgentList(agentList)

#If not all agents have empty queues, then sort the agents based on their number of people in queue
        
if all(v == 0 for v in sortedAgentListNumber) == False: 
    sortedAgentList = sorted(sortedAgentList, key=lambda Agent:len(Agent.get_queue()))
    

while True:
    if len(customerList) > 0:
        for i in range(len(sortedAgentList)):
            if  len(customerList) > 0: 
                if sortedAgentList[i].get_skills() == customerList[0][1]:     #if customer's request coincides with agent's skillset
                    print(i)
                    print("Checking {}'s skills and {}'s skills".format(sortedAgentList[i].get_name(), customerList[0][0]))
                    sortedAgentList[i].addToQueue(customerList[0]) #add customer to agent's list 
                    print("{} added to {}'s queue".format(customerList[0][0],sortedAgentList[i].get_name()))
                    del customerList[0] #delete customer from customerList
                    checkSortedList(sortedAgentList)
                    checkAgentList(agentList)
                    sortedAgentList = sorted(sortedAgentList, key=lambda Agent:len(Agent.get_queue())) #sorts the sortedAgentList
    else:
        break
    

joinedAgentList = agentList + sortedAgentList

for i in joinedAgentList:
    if i.get_availability() == "Available": #if agent has no customer assigned -> means its available
        i.set_assignment() #assign first customer in agent's queue to him
        i.deleteFromQueue() #delete first customer in agent's queue
    else:
        pass